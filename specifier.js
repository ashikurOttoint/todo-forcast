const keyGenerator = require('/opt/api-key-generator');
const request = require('request-promise-native');
const uuidv4 = require("uuid/v4");
const moment = require('moment');
const { SERVICE_URL, INTEGRATION_URL, INTEGRATION_API_KEY, INTEGRATION_API_VERSION, INTEGRATION_ENABLED } = process.env;
  
exports.handler = async event => {
  const transaction = event;
  console.log('Client Id:', transaction.clientId);
  console.log('Transaction Id:' , transaction.id);
  console.log('TransactionCurrency:' , transaction.transactionCurrency);
  const generator = new keyGenerator.ApiKeyGenerator();
  const apiKey = generator.generateApiKey(transaction.clientId);
  
  const result = await sendTransactionToIntegrationProvider(apiKey, transaction);
  
  await updateTransaction(apiKey, transaction.id, result);
};
  
// Send the transaction to Integration Provider
async function sendTransactionToIntegrationProvider(apiKey, transaction) {
  console.log(`Sending transaction to Integration Provider`);
  let productDescription = '';
  
  const b = await fetchEntity(apiKey, `${SERVICE_URL}/buyer/${transaction.buyerId}`);
  const s = await fetchEntity(apiKey, `${SERVICE_URL}/seller/${transaction.sellerId}`);
  
  let result = undefined;
  if (INTEGRATION_ENABLED === 'true') {
    if (!propertyDefined(s, 'integrationId')) {
      throw new Error('Missing integrationId, Seller not set up in Integration');
    }
  
    if (propertyDefined(transaction, 'productId')) {
      const productUrl = `${SERVICE_URL}/product/transaction.productId}`;
      const product = await fetchEntity(apiKey, productUrl);
  
      if (propertyDefined(product, 'description')) {
        productDescription = product.description;
      }
    }
  
    const body = {
      transaction_id: transaction.id,
      buyer_id: b.id,
      seller_id: s.id,
      date: moment(transaction.transactionTimestamp).format('YYYY-MM-DD'),
      total: formatCurrencyAmount(transaction.amount),
      tax_amount: formatCurrencyAmount(transaction.taxAmount),
      currency: transaction.transactionCurrency,
      details: [
        {
          sku: transaction.sku,
          description: productDescription,
          quantity: Number(transaction.quantity),
          unit_price: formatCurrencyAmount(transaction.unitPrice)
        }
      ]
    };
    const correlationId = uuidv4();
  
    console.log(body);
    console.log(`INTEGRATION x-correlation-id: ${correlationId}`);
  
    result = await request({
      method: 'POST',
      uri: `${INTEGRATION_URL}/${INTEGRATION_API_VERSION}/invoices`,
      headers: {
        'x-correlation-id': correlationId,
        Authorization: `Basic ${Buffer.from(INTEGRATION_API_KEY)}`
      },
      auth: {
        username: process.env.INTEGRATION_API_KEY,
        password: 'my$uper$3cretP@ssw0rd'
      },
      json: true,
      body
    });
  
    console.log(result);
  
    if (!propertyDefined(result, 'id') || !propertyDefined(result, 'bill_date') || !propertyDefined(result, 'due_date')) {
      throw new Error('Missing required values from INTEGRATION response');
    }
  } else {
    console.log('INTEGRATION turned off, faking result');
  
    result = {
      id: undefined,
      bill_date: moment().add(1, 'days').format('YYYY-MM-DD'),
      due_date: moment().add(b.paymentTerms + 1, 'days').format('YYYY-MM-DD')
    };
  
    console.log(result);
  }
  
  return result;
}
  
async function fetchEntity(apiKey, url) {
  const entity = await request({
    uri: url,
    headers: {
      Authorization: `x-api-key ${apiKey}`
    },
    json: true
  });
  
  return entity;
}
  
// Check to see if a property exists on an object and that it has a value
function propertyDefined(objectNm, propertyNm) {
  return (objectNm.hasOwnProperty(propertyNm) && objectNm[propertyNm] !== '' && objectNm[propertyNm] !== null);
}
  
// Integration provider expects currency amounts to be returned as integers with implied 2 decimal places
function formatCurrencyAmount(amountString) {
  return parseFloat(amountString) * 100;
}
  
// Update the transaction with the results from IntegrationProvider
async function updateTransaction(apiKey, transactionId, resultBody) {
  await request({
    method: 'PATCH',
    uri: `${SERVICE_URL}/transaction/${transactionId}`,
    headers: {
      Authorization: `x-api-key ${apiKey}`
    },
    json: true,
    body: {
      integrationId: resultBody.id,
      statementDate: resultBody.bill_date,
      paymentDate: resultBody.due_date
    }
  });
}

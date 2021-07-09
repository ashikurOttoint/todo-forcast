import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {LabelSmall} from './Label';
import Text from './Text';
import device from '../../responsive/device-detect';

const ForecastWrapper = styled.div`
  flex-shrink: 0;
  flex-basis: 90px;
  padding: 10px;
  margin: 0 5px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.2);
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
  @media ${device.tablet} {
    flex-basis: 110px;
  }
  @media ${device.laptop} {
    flex-basis: 125px;
  }
  @media ${device.laptopL} {
    flex-basis: 140px;
  }
`;

const WeatherIcon = styled.img`
  display: block;
  height: 50px;
  width: 50px;
  margin: 0 auto;
`;

const Forecast = props => {
  const { temp,icon,timestamp } = props;
  const iconUrl = `https://openweathermap.org/img/w/${icon}.png`;

  return (
    <ForecastWrapper>
      <Text align="center">
      {moment(timestamp).format('MMM Do YYYY')}
      </Text>
      <Text align="center">
      {moment(timestamp).format('dddd')}
      </Text>
      <Text align="center">
      {moment(timestamp).format('LT')}
      </Text>
      <WeatherIcon src={iconUrl} />
      <LabelSmall align="center" weight="400">
        {temp}&#176;
      </LabelSmall>
    </ForecastWrapper>
  );
};

Forecast.propTypes = {
  temp: PropTypes.number.isRequired,
  month: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  hour: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Forecast;
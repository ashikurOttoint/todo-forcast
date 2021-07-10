import React from "react";
import { ListGroup, Button } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';

class TodoList extends React.Component {



  render() {
    const items = this.props.items;
    return (

      <div>
        {items.map((item, index) => {
          return (<ListGroup key={index}>
            <ListGroup.Item action variant={item.isCompleted ? 'success':'primary'} className={'p-2 m-2'}>
              <p text={'white'}>{item.text}</p>
              <Button onClick={() => this.props.markAsComplete(index)} variant="outline-success" type="submit" size="sm">
                <FontAwesomeIcon icon={faCheck} />
              </Button> {' '}
              <Button onClick={() => { this.props.editItem(item, items, index); this.props.turnOnEditing(); this.props.setEditingIndexValue(index) }} variant="outline-warning" type="submit" size="sm">
                <FontAwesomeIcon icon={faPen} />
              </Button>{' '}
              <Button onClick={() => this.props.deleteItem(index)} variant="outline-danger" type="submit" size="sm">
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </ListGroup.Item>

          </ListGroup>)
        })}

      </div>
    );

  }
}

export default TodoList;
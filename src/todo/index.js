import React from "react";
import { Container } from "react-bootstrap"

import AddToDo from "./components/AddForm";
import TodoList from "./components/List";
import EditToDo from "./components/Edit";
class ToDoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: [], editing: false, editingIndexValue: ''};
    this.addItem = this.addItem.bind(this)
    this.editItem = this.editItem.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.markAsComplete = this.markAsComplete.bind(this)
    this.turnOnEditing = this.turnOnEditing.bind(this)
    this.turnOffEditing = this.turnOffEditing.bind(this)
    this.setEditingIndexValue = this.setEditingIndexValue.bind(this)
  }
  addItem(item) {
    this.setState(prevState => ({
      items: [...prevState.items, item]
    }))
    
  }
  setEditingIndexValue(index) {
    this.setState(prevState => ({
      editingIndexValue: index
    }))
  }
  turnOnEditing() {
    this.setState(prevState => ({
      editing: true
    }))
    console.log(this.state.editing);
  }

  turnOffEditing() {
    this.setState(prevState => ({
      editing: false
    }))
  }

  editItem(item,items,index) {
    let newitems = items;
    newitems[index] = item;

    this.setState(prevState => ({
      items: newitems
    }))
    
  }
  deleteItem(index) {
    let newitems = this.state.items.filter(function(_, indx){ 
      return indx !== index;
  });
    this.setState(prevState => ({
      items:newitems
    }))
    
  }
  markAsComplete(index) {
    let items = this.state.items;
    let item = items[index];
    item.isCompleted = true;
    items[index] = item 

    this.setState(prevState => ({
      items:items
    }))
    console.log("mark as complete index",this.state.items[index])
  }

  render() {
    return (
      <Container>
       
      {  this.state.editing ? <EditToDo items={this.state.items} ivl={this.state.editingIndexValue} turnOffEditing={this.turnOffEditing} setEditingIndexValue={this.setEditingIndexValue} editItem={this.editItem}/> : <AddToDo items={this.state.items} addItem={this.addItem}/>  }
      
      <TodoList 
      items={this.state.items}
      turnOnEditing={this.turnOnEditing}
      turnOffEditing={this.turnOffEditing}
      editItem={this.editItem}
      markAsComplete={this.markAsComplete}
      setEditingIndexValue={this.setEditingIndexValue}
      deleteItem={this.deleteItem}/>
      </Container>);
  }
}

export default ToDoComponent;
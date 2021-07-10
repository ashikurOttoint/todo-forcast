import React from "react";
import { Form, Button } from "react-bootstrap"

class AddToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({text: event.target.value});
  }
  handleSubmit = (event) => {
    if( this.state.text.length) {
      this.props.addItem({text: this.state.text, isCompleted: false})
    }
    this.setState({text: ''})
    event.preventDefault();
}
  
  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <h2 className="mt-5">Todo List</h2>
            <Form.Control type="text"  value={this.state.text} onChange={this.handleChange} placeholder="Enter text" />
          </Form.Group>
          <Button  variant="info" type="submit" size="md" className={'m-2'}>
            Add Todo
          </Button>
        </Form>
      </div>);

  }
}

export default AddToDo;
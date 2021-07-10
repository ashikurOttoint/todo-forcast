import React from "react";
import { Form, Button } from "react-bootstrap"

class EditToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {item: "", text:""};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({text: event.target.value});
  }
  handleSubmit = (event) => {
     
    if( this.state.text.length) {
      this.props.editItem({text: this.state.text, isCompleted: this.props.items[this.props.ivl].isCompleted},this.props.items,this.props.ivl)
    }
    this.setState({text: ''})
    this.props.turnOffEditing();
    event.preventDefault();
}
componentDidMount() {
  console.log(this.props);
  this.setState({item: this.props.item, text: this.props.items[this.props.ivl].text});
}
  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formedit">
            <h2>Update Todo</h2>
            <Form.Control type="text" onChange={this.handleChange} value={this.state.text}/>
          </Form.Group>
          <Button variant="warning" type="submit">
            Edit
          </Button>
        </Form>
      </div>);

  }
}

export default EditToDo;
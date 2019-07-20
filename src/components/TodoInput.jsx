import React from 'react';
import '../styles/todoInput.css';
import { ReactComponent as Plus } from '../icons/plus.svg';

export default class TodoInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newTodoItemValue: '', // initialize to empty string
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.inputBox = React.createRef();
  }

  handleChange(e) {
    const newTodoItemValue = e.target.value;
    this.setState({ newTodoItemValue });
  }

  handleSubmit(e) {
    e.preventDefault();   // use it for any and all forms with custom submit behavior 
    const { addItem } = this.props;
    const { newTodoItemValue } = this.state;

    if (newTodoItemValue !== '') { // form value is not empty
      addItem(newTodoItemValue);
      this.setState({ newTodoItemValue: '' }); // clear back to empty string
    }
  }

  render() {
    const { newTodoItemValue } = this.state;
    return (
      <div className="todo-input-container">
        {/* Form groups buttons and inputs in */ }
        <form onSubmit={this.handleSubmit}>
          {/* the onSubmit prop is called when users press the submit button (marked with submit type) */ }
          <input
            placeholder="Add Task..."
            value={newTodoItemValue}
            onChange={this.handleChange}
            className="todo-input"
            ref={this.inputBox}
          />
          <button type="submit" className="todo-input-button">
            <Plus />
          </button>
        </form>
      </div>
    );
  }
}

import React from 'react';
import TodoItem from './components/TodoItem';
import TodoInput from './components/TodoInput';
import ClearButton from './components/ClearButton';
import EmptyState from './components/EmptyState';
import ModalWithInput from './components/ModalWithInput';

import './styles/App.css';
// ReactModal.defaultStyles.overlay.backgroundColor = '#2F2F2F';

/**
 * @edge 
 * 
 * if you start and pause your first session, your item is marked as not having started, you don't want that
 * 
 * SLATE
 * TODO
 * 
 * 2. ability to change the title to whatever you want... 'what are we working on today'
 * 3. send summary of session in an email to your desired email account
 * 4. export functionality plus a close functionality (that also exports)
 */

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.clearCompletedItems = this.clearCompletedItems.bind(this);
    this.increaseSessionsCompleted = this.increaseSessionsCompleted.bind(this);
    this.toggleItemIsCompleted = this.toggleItemIsCompleted.bind(this);
    this.addPressed = this.addPressed.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);

    this.state = {
      items: [],
      nextItemId: 0,
      sessionIsRunning: false,
      itemIdRunning: null,
      areItemsMarkedAsCompleted: false,
      showModal: false,
      currDescription: '',
    };

    // React Refs
    this.titleTextInput = React.createRef();
    this.todoTextInput = React.createRef(); 
  }

  componentDidMount() {
    this.todoTextInput.current.inputBox.current.focus();
  }

  addPressed (description) {
    this.setState({ 
      showModal: true,
      currDescription: description
    });
  }

  onKeyDown(e) {
    if (e.key === 'Enter') {
      this.todoTextInput.current.inputBox.current.focus();
    }
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }

  addItem(numPomodoros) {
    const { nextItemId } = this.state;
    const newItem = {
      // TODO 2: initialize new item object
      id: nextItemId, // a unique id identifying this item
      description: this.state.currDescription, // a brief description of the todo item
      sessionsTargeted: numPomodoros,   // the number of pomodoro sessions targeted this item
      sessionsCompleted: 0, // how many times a pomodoro session has been completed
      isCompleted: false, // whether the item has 
    };
    this.setState((prevState => ({
      // TODO 2: append new items to list and increase nextItemId by 1
      nextItemId: prevState.nextItemId + 1,
      items: prevState.items.concat(newItem),
      currDescription: '',
      showModal: false
    })));
  }

  clearCompletedItems() {
    // TODO 6
    this.setState({
      items: this.state.items.filter(item => item.isCompleted === false),
      areItemsMarkedAsCompleted: false
    });
  }

  increaseSessionsCompleted(itemId) {
    // TODO 5
    let copy = [...this.state.items];
    copy.forEach(item => {
      if (item.id === itemId) {
        item.sessionsCompleted += 1;
      }
    });
    this.setState({
      items: copy
    });
  }

  toggleItemIsCompleted(itemId) {
    // TODO 6
    let copy = [...this.state.items];
    let areItemsMarkedAsCompleted = false;
    copy.forEach(item => {
      if (item.id === itemId) {
        item.isCompleted = !item.isCompleted;
      }
    });
    
    copy.forEach(item => {
      if (item.isCompleted) {
        areItemsMarkedAsCompleted = true;
      }
    });

    this.setState({
      items: copy,
      areItemsMarkedAsCompleted: areItemsMarkedAsCompleted
    });
  }

  toggleSession(id) {
    this.setState(prevState => {
      if (prevState.itemIdRunning !== id) {
        return {
          sessionIsRunning: true,
          itemIdRunning: id
        };  
      } else {
          return {
            sessionIsRunning: !prevState.sessionIsRunning
          }; 
      }
    });
  }

  render() {
    const {
      items,
      areItemsMarkedAsCompleted,
    } = this.state;
    return (
      <div className="flex-wrapper">
          <div className="container">
            <header>
              <input 
                className="heading" 
                placeholder="What we doing today?"
                ref={this.titleTextInput}
                onKeyDown={this.onKeyDown}
              />
              {areItemsMarkedAsCompleted && <ClearButton onClick={this.clearCompletedItems} />}
            </header>
              {this.state.items.length > 0 ? 
              <div className="items-container">
                {items.map(item =>
                  <TodoItem 
                    key={item.id}
                    id={item.id}
                    itemIdRunning={this.state.itemIdRunning}
                    sessionIsRunning = {this.state.sessionIsRunning}
                    increaseSessionsCompleted={this.increaseSessionsCompleted}
                    description={item.description}
                    sessionsTargeted={item.sessionsTargeted}
                    sessionsCompleted={item.sessionsCompleted}
                    // The map function creates a bunch of
                    // functions each with an id specific to each
                    // item
                    isCompleted = {item.isCompleted}
                    startSession={() => this.startSession(item.id)}
                    toggleSession={() => this.toggleSession(item.id)}
                    toggleIsCompleted={() => this.toggleItemIsCompleted(item.id)}
                  />
                )}
              </div>
              : <EmptyState />}
          </div>
          
          <footer>
            <TodoInput 
              addItem={this.addPressed} 
              ref={this.todoTextInput}
            />
            <ModalWithInput
              showModal={this.state.showModal}
              handleCloseModal={this.handleCloseModal}
              addItem={this.addItem}
            />
          </footer>
          {window.onbeforeunload = s => this.state.items.length > 0 ? "" : null }
      </div>
    );
  }
}

export default App;

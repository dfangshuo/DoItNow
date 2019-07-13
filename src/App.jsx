import React from 'react';
import Timer from './components/Timer';
import TodoItem from './components/TodoItem';
import TodoInput from './components/TodoInput';
import ClearButton from './components/ClearButton';
import EmptyState from './components/EmptyState';

import './styles/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.clearCompletedItems = this.clearCompletedItems.bind(this);
    this.startSession = this.startSession.bind(this);
    this.increaseSessionsCompleted = this.increaseSessionsCompleted.bind(this);
    this.toggleItemIsCompleted = this.toggleItemIsCompleted.bind(this);

    this.state = {
      // TODO 1
      items: [],
      nextItemId: 0,
      sessionIsRunning: false,
      itemIdRunning: null
    };
  }

  addItem(description) {
    const { nextItemId } = this.state;
    const newItem = {
      // TODO 2: initialize new item object
    };
    this.setState((prevState => ({
      // TODO 2: append new items to list and increase nextItemId by 1
    })));
  }

  clearCompletedItems() {
    // TODO 6
  }

  increaseSessionsCompleted(itemId) {
    // TODO 5
  }

  toggleItemIsCompleted(itemId) {
    // TODO 6
  }

  startSession(id) {
    // TODO 4
  }

  render() {
    const {
      items,
      sessionIsRunning,
      itemIdRunning,
      areItemsMarkedAsCompleted,
    } = this.state;
    return (
      <div className="flex-wrapper">
        <div className="container">
          <header>
            <h1 className="heading">Today</h1>
            <ClearButton onClick={this.clearCompletedItems} />
          </header>
          {/* TODO 4 */}
            {/* <Timer
              mode="WORK"
              onSessionComplete={() => { console.log("complete") }}
              autoPlays
            /> */}
            <div className="items-container">
            {/* TODO 3:  display todo items */}
            </div>
        </div>
        <footer>
          <TodoInput addItem={this.addItem} />
        </footer>
      </div>
    );
  }
}

export default App;

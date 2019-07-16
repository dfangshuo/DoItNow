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
      itemIdRunning: null,
      areItemsMarkedAsCompleted: false
    };
  }

  addItem(description) {
    const { nextItemId } = this.state;
    const newItem = {
      // TODO 2: initialize new item object
      id: nextItemId, // a unique id identifying this item
      description: description, // a brief description of the todo item
      sessionsTargeted: 5,   // the number of pomodoro sessions targeted this item
      sessionsCompleted: 0, // how many times a pomodoro session has been completed
      isCompleted: false, // whether the item has 
    };
    this.setState((prevState => ({
      // TODO 2: append new items to list and increase nextItemId by 1
      nextItemId: prevState.nextItemId + 1,
      items: prevState.items.concat(newItem)
    })));
  }

  clearCompletedItems() {
    // TODO 6
    this.setState({
      items: this.state.items.filter(item => item.isCompleted === false)
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

  startSession(id) {
    // TODO 4
    this.setState({
      sessionIsRunning: true,
      itemIdRunning: id
    });
  }

  render() {
    const {
      items,
      sessionIsRunning,
      itemIdRunning,
      areItemsMarkedAsCompleted,
    } = this.state;
    return (
      // {this.state.items.length > 0 }
      <div className="flex-wrapper">
        {this.state.items.length > 0 ? 
          <div className="container">
            <header>
              <h1 className="heading">Today</h1>
              {areItemsMarkedAsCompleted && <ClearButton onClick={this.clearCompletedItems} />}
            </header>
            {/* TODO 4 */}
              {/* {sessionIsRunning && <Timer
                key={itemIdRunning}
                mode="WORK"
                onSessionComplete={() => this.increaseSessionsCompleted(itemIdRunning)}
              />} */}
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
                    toggleIsCompleted={() => this.toggleItemIsCompleted(item.id)}
                  />
                )}
              </div>
          </div>
          : <EmptyState />}
          <footer>
            <TodoInput addItem={this.addItem} />
          </footer>
      </div>
    );
  }
}

export default App;

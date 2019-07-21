import React from 'react';
import '../styles/todoItem.css';
import SessionsCompletedCounter from './SessionsCompletedCounter';
import { ReactComponent as Check } from '../icons/check.svg';
import { ReactComponent as Clock } from '../icons/clock.svg';
import Timer from './Timer';

class TodoItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: 'START'
    //   time: MODES_TIMES[props.mode],
    //   isPlaying: props.autoPlays,
    };

    this.updateMode = this.updateMode.bind(this);
  }

  updateMode() {
    this.setState((prevState) => {
      return { mode: prevState.mode === 'WORK' || prevState.mode === 'START' ? 'BREAK' : 'WORK' };
    });
  }

  render() {
    let mode = 'break';
    if (this.state.mode === 'START') {
      mode = null;
    } else if (this.state.mode === 'WORK') {
      mode = 'in-progress';
    }
    const outerContainerClassName = `${!this.props.isCompleted && 'card'} todo-item-outer-container ${!this.props.isCompleted && mode}`;
    const innerContainerClassName = `todo-item-inner-container ${!this.props.isCompleted && mode}`;
    return (
      <div className={outerContainerClassName} >
        <div className={innerContainerClassName}>
          <div className="todo-item-container-left">
            <button onClick={this.props.toggleIsCompleted} type="button" className="todo-item-complete-button">
              { this.props.isCompleted
                ? <div className="todo-item-circle todo-item-circle-check"><Check /></div>
                : <div className="todo-item-circle todo-item-circle-empty" />
              }
            </button>
            <div>
              <div className="todo-item-description">{ this.props.description }</div>
              <SessionsCompletedCounter 
                sessionsCompleted={this.props.sessionsCompleted} 
                sessionsRemaining={this.props.sessionsTargeted-this.props.sessionsCompleted} 
              />
            </div>
          </div>
          {!this.props.isCompleted && <button type="button" onClick={this.props.toggleSession} className="todo-item-start-session-button"><Clock /></button>}
        </div> 
        {
          this.props.sessionIsRunning && 
          !this.props.isCompleted && 
          this.props.itemIdRunning === this.props.id  && 
          <div>
            <Timer
              key={this.props.itemIdRunning}
              mode={this.state.mode}
              onSessionComplete={() => this.props.increaseSessionsCompleted(this.props.itemIdRunning)}
              updateMode={this.updateMode}
              demoMode={this.props.demoMode}
            />
          </div>
        }   
      </div>
    );
  }

}

// function TodoItem({
//   id,
//   itemIdRunning,
//   sessionIsRunning,
//   increaseSessionsCompleted,
//   description,
//   sessionsTargeted,
//   sessionsCompleted,
//   isCompleted,
//   startSession,
//   toggleIsCompleted,
// }) {
//   let mode = 'WORK';
//   const outerContainerClassName = `card todo-item-outer-container ${mode === 'WORK' ? null : 'break'}`;
//   return (
//     <div className={outerContainerClassName} onClick={startSession} >
//       <div className="todo-item-inner-container">
//         <div className="todo-item-container-left">
//           <button onClick={toggleIsCompleted} type="button" className="todo-item-complete-button">
//             { isCompleted
//               ? <div className="todo-item-circle todo-item-circle-check"><Check /></div>
//               : <div className="todo-item-circle todo-item-circle-empty" />
//             }
//           </button>
//           <div>
//             <div className="todo-item-description">{ description }</div>
//             <SessionsCompletedCounter sessionsCompleted={sessionsCompleted} sessionsRemaining={sessionsTargeted-sessionsCompleted} />
//           </div>
//         </div>
//         <button type="button" onClick={startSession} className="todo-item-start-session-button"><Clock /></button>
//       </div> 
//       {
//         sessionIsRunning && 
//         itemIdRunning === id  && 
//         <div>
//           <Timer
//             key={itemIdRunning}
//             mode={mode}
//             onSessionComplete={() => increaseSessionsCompleted(itemIdRunning)}
//           />
//         </div>
//       }   
//     </div>
//   );
// }

export default TodoItem;

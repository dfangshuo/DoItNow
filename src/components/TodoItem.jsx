import React from 'react';
import '../styles/todoItem.css';
import SessionsCompletedCounter from './SessionsCompletedCounter';
import { ReactComponent as Check } from '../icons/check.svg';
import { ReactComponent as Clock } from '../icons/clock.svg';
import Timer from './Timer';

function TodoItem({
  id,
  itemIdRunning,
  sessionIsRunning,
  increaseSessionsCompleted,
  description,
  sessionsTargeted,
  sessionsCompleted,
  isCompleted,
  startSession,
  toggleIsCompleted,
}) {
  return (
    <div>
      <div className="card todo-item-container" >
        <div className="todo-item-container-left">
          <button onClick={toggleIsCompleted} type="button" className="todo-item-complete-button">
            { isCompleted
              ? <div className="todo-item-circle todo-item-circle-check"><Check /></div>
              : <div className="todo-item-circle todo-item-circle-empty" />
            }
          </button>
          <div>
            <div className="todo-item-description">{ description }</div>
            <SessionsCompletedCounter sessionsCompleted={sessionsCompleted} sessionsRemaining={sessionsTargeted-sessionsCompleted} />
          </div>
        </div>
        <button type="button" onClick={startSession} className="todo-item-start-session-button"><Clock /></button>
      </div>
      {sessionIsRunning && itemIdRunning === id  && <Timer
        key={itemIdRunning}
        mode="WORK"
        onSessionComplete={() => increaseSessionsCompleted(itemIdRunning)}
      />}
    </div>
  );
}

export default TodoItem;

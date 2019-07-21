import React from 'react';
import formatSecondsToMinutesAndSeconds from '../lib/formatSecondsToMinutesAndSeconds';
import PausePlayButton from './PausePlayButton';
import ResetButton from './ResetButton';
import '../styles/timer.css';

const ONE_MIN = 60;
const WORK_TIME = 25*ONE_MIN;
const BREAK_TIME = 5*ONE_MIN;

const MODES_TIMES = {
  WORK: WORK_TIME,
  BREAK: BREAK_TIME,
  START: WORK_TIME
};

const DEMO_MODES_TIMES = {
  WORK: 2,
  BREAK: 1,
  START: 2
};

const TIME_STEP = 1000;

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.setTimer = this.setTimer.bind(this);
    this.stop = this.stop.bind(this);
    this.tick = this.tick.bind(this);
    this.completeSession = this.completeSession.bind(this);
    this.toggleIsPlaying = this.toggleIsPlaying.bind(this);
    this.reset = this.reset.bind(this);

    this.state = {
      mode: props.mode,
      time: this.props.demoMode ? DEMO_MODES_TIMES[props.mode] : MODES_TIMES[props.mode],
      isPlaying: props.autoPlays,
    };
  }

  componentDidMount() {
    const { mode, time } = this.state;
    this.setTimer(mode, time);
  }

  componentWillUnmount() {
    this.stop();
  }

  setTimer(mode, time) {
    this.setState({
      mode,
      time,
    });

    this.timerID = setInterval(this.tick, TIME_STEP);
  }

  stop() {
    this.setState({ isPlaying: false });
    clearInterval(this.timerID);
  }

  tick() {
    const { mode, isPlaying, time } = this.state;

    if (isPlaying) {
      this.setState(prevState => ({
        time: prevState.time - 1,
      }),
      () => {
        if (time === 0) {
          this.stop();

          if (mode === 'WORK' || mode === 'START') {
            this.setTimer('BREAK', MODES_TIMES.BREAK);
          }

          if (mode === 'BREAK') {
            this.completeSession();
            this.setTimer('WORK', MODES_TIMES.WORK);
          }

          this.props.updateMode();
        }
      });
    }
  }

  toggleIsPlaying() {
    this.setState(prevState => ({ isPlaying: !prevState.isPlaying }));
  }

  reset() {
    this.stop();
    this.setTimer('WORK', MODES_TIMES.WORK, false);
  }

  completeSession() {
    const { onSessionComplete } = this.props;
    onSessionComplete();
  }


  render() {
    const { time, isPlaying } = this.state;
    const formattedTime = formatSecondsToMinutesAndSeconds(time);
    return (
      <div className="timer-container">
        <div>
          <ResetButton onClick={this.reset} />
        </div>
        <div>{formattedTime}</div>
        <div>
          <PausePlayButton isPlaying={isPlaying} onClick={this.toggleIsPlaying} />
        </div>
      </div>
    );
  }
}

export default Timer;

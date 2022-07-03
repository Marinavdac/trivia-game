import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
state = {
  timer: 30,
  timerId: '',
}

// shouldComponentUpdate = (nextProps, nextState) => {
//   const { timer } = this.state;
//   const { parentCallBack } = this.props;
//   if (nextState.timer !== timer) {
//     parentCallBack(timer);
//     return true;
//   }
// }

// componentDidMount = () => {
//   const sec = 1000;
//   setInterval(() => {
//     this.setState((prevState) => ({
//       timer: prevState.timer > 0 ? (prevState.timer - 1) : 'timeout',
//     }));
//   }, sec);
// }

// https://stackoverflow.com/questions/36299174/setinterval-in-a-react-app

componentDidMount() {
  const sec = 1000;
  const timerId = setInterval(this.timeCounter, sec);
  this.setState({
    timerId,
  });
}

componentWillUnmount() {
  const { timerId } = this.state;
  clearInterval(timerId);
}

  timeCounter = () => {
    const { parentCallBack } = this.props;
    const { timer, timerId } = this.state;
    const currentTime = timer - 1;
    if (currentTime >= 0) {
      this.setState({
        timer: currentTime,
      });
    } else {
      clearInterval(timerId);
    }
    if (currentTime === 0) {
      parentCallBack(currentTime, true);
    }
  }

  render() {
    const { timer } = this.state;
    return (
      <h1>{ timer }</h1>
    );
  }
}

Timer.propTypes = {
  // getTimer: PropTypes.func.isRequired,
  parentCallBack: PropTypes.func.isRequired,
};

export default Timer;

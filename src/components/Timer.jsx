import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
state = {
  timer: 30,
}

shouldComponentUpdate = (nextProps, nextState) => {
  const { timer } = this.state;
  const { parentCallBack } = this.props;
  if (nextState.timer !== timer) {
    parentCallBack(timer);
    return true;
  }
}

componentDidMount = () => {
  const sec = 1000;
  setInterval(() => {
    this.setState((prevState) => ({
      timer: prevState.timer > 0 ? (prevState.timer - 1) : 'Time Out',
    }));
  }, sec);
}

render() {
  const { getTimer } = this.props;
  const { timer } = this.state;
  return (
    <h1 timer={ getTimer }>{ timer }</h1>
  );
}
}

Timer.propTypes = {
  getTimer: PropTypes.func.isRequired,
  parentCallBack: PropTypes.func.isRequired,
};

export default Timer;

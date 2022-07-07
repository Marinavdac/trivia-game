import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  btnHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div className="trivia-game-screen">
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.btnHome }
        >
          Volte ao início
        </button>
        <h1 data-testid="ranking-title">Ranking</h1>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;

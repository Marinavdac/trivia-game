import React, { Component } from 'react';

class Ranking extends Component {
  render() {
    return (
      <>
        <button
          type="button"
          data-testeid="btn-go-home"
        >
          Volte ao início
        </button>
        <h1 data-testid="ranking-title">Ranking</h1>
      </>
    );
  }
}

export default Ranking;

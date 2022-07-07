import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getAvatar from '../services/fetchGravatar';
import './styles/Ranking.css';

class Ranking extends Component {
  state = {
    rankingState: null,
  };

  btnHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  componentDidMount = () => {
    const { score, email, name } = this.props;
    const gravatarPic = getAvatar(email);
    const array = {
      name,
      score,
      email: gravatarPic,
    };
    localStorage.setItem('player', JSON.stringify(array));
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const teste = JSON.parse(localStorage.getItem('player'));
    if (ranking === null) {
      const juntatudo = [teste];
      localStorage.setItem('ranking', JSON.stringify(juntatudo));
      const estado = JSON.parse(localStorage.getItem('ranking'));
      this.setState({ rankingState: estado });
    } else {
      const juntatudo = [...ranking, teste];
      localStorage.setItem('ranking', JSON.stringify(juntatudo));
      const estado = JSON.parse(localStorage.getItem('ranking'));
      const sortState = estado.sort(function (a, b) {
        return b.score - a.score;
      });
      this.setState({ rankingState: sortState });
    }
  };

  render() {
    const { rankingState } = this.state;
    return (
      <div className="ranking-page">
        <h1 data-testid="ranking-title" className="ranking-title">Ranking</h1>
        <div className='players-ranking'>
        {rankingState?.map(({ email, score, name }, index) => (
          <div key={ index } className="player-ranking">
            <img src={ email } alt="gravatar" className="gravatar-ranking"/>
            <p data-testid={`player-name-${ index }` } className="name-ranking">{ name }</p>
            <p data-testid={`player-score-${ index }`} className="score-ranking">{ score }</p>
          </div>
        ))}
        </div>
        <button 
        ype="button"
        data-testid="btn-go-home"
        onClick={ this.btnHome }
        className="btn-ranking"
        >
          Volte ao início
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Ranking);

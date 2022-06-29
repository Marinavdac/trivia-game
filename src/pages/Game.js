import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getAvatar from '../services/fetchGravatar';

class Game extends Component {
  state = {
    profileGravatar: '',
  }

componentDidMount = async () => {
  const { email } = this.props;
  const fetchG = await getAvatar(email);
  this.setState({
    profileGravatar: fetchG,
  });
}

render() {
  const { profileGravatar } = this.state;
  return (
    <div>
      <header>
        <img src={ profileGravatar } alt="profile" data-testid="header-profile-picture" />
        <h1 data-testid="header-player-name">Nome</h1>
        <h2 data-testid="header-score">Placar</h2>
      </header>
    </div>
  );
}
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
});

Game.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);

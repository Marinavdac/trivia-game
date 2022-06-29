import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';

class Login extends Component {
  state = {
    name: '',
    email: '',
    isDisabled: true,
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.handleButton);
  };

  handleButton = () => {
    const { name, email } = this.state;
    if (name.length !== 0 && email.length !== 0) {
      return this.setState({ isDisabled: false });
    }
    return this.setState({ isDisabled: true });
  }

  render() {
    const { isDisabled } = this.state;
    const { handleChange } = this;
    return (
      <LoginForm
        handleChange={ handleChange }
        isDisabled={ isDisabled }
      />
    );
  }
}

export default Login;

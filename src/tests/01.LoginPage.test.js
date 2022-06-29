import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Cria testes para tela iniicial de Login', () => {
  test('01 - Verifica se a tela possui o campo de nome na tela do login', () => {
    renderWithRouterAndRedux(<App />);
    const name = screen.getByTestId('input-player-name')
    expect(name).toBeInTheDocument();
  })
  test('02 - Verifica se a tela possui o campo de email na tela do login', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId('input-gravatar-email')
    expect(email).toBeInTheDocument();
  })
  test('03 - Verifica se a tela possui o botão play na tela do login', () => {
    renderWithRouterAndRedux(<App />);
    const playBtn = screen.getByTestId('btn-play')
    expect(playBtn).toBeInTheDocument();
  })
  test('04 - Verifica se a tela possui o botão settings na tela do login', () => {
    renderWithRouterAndRedux(<App />);
    const settingsBtn = screen.getByTestId('btn-settings')
    expect(settingsBtn).toBeInTheDocument();
  })


})
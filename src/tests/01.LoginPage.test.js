import React from 'react';
import App from '../App';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux.js';

describe('Cria testes para tela inicial de Login', () => {
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
  test('05 - Verifica se o botão para jogar está desabilitado inicialmente', () => {
    renderWithRouterAndRedux(<App />);
    const playBtn = screen.getByTestId('btn-play')
    expect(playBtn).toBeDisabled();
  })
  test('06 - Verifica se o botão está desabilitado com nome em branco', () => {
    renderWithRouterAndRedux(<App />);
    const name = screen.getByTestId('input-player-name')
    const playBtn = screen.getByTestId('btn-play')
    userEvent.type(name, ' ');
    expect(playBtn).toBeDisabled();
  })
  test('07 - Verifica se o botão está desabilitado com nome em branco', () => {
    renderWithRouterAndRedux(<App />);
    const name = screen.getByTestId('input-player-name')
    const email = screen.getByTestId('input-gravatar-email')
    const playBtn = screen.getByTestId('btn-play')
    userEvent.type(name,'');
    userEvent.type(email, 'email@teste.com');
    expect(playBtn).toBeDisabled();
  })
  test('08 - Verifica se o botão está desabilitado com campo email em branco', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId('input-gravatar-email')
    const playBtn = screen.getByTestId('btn-play')
    userEvent.type(email, ' ');
    expect(playBtn).toBeDisabled();
  })
  test('07 - Verifica se o botão está desabilitado com email em branco', () => {
    renderWithRouterAndRedux(<App />);
    const name = screen.getByTestId('input-player-name')
    const email = screen.getByTestId('input-gravatar-email')
    const playBtn = screen.getByTestId('btn-play')
    userEvent.type(name,'alguma pessoa jogadora');
    userEvent.type(email, '');
    expect(playBtn).toBeDisabled();
  })
  test('08 - Verifica se o botão está habilitado com campos preenchidos', () => {
    renderWithRouterAndRedux(<App />);
    const name = screen.getByTestId('input-player-name')
    const email = screen.getByTestId('input-gravatar-email')
    const playBtn = screen.getByTestId('btn-play')
    userEvent.type(name, 'alguma pessoa jogadora');
    userEvent.type(email, 'email@teste.com');
    expect(playBtn).not.toBeDisabled();
  })
  test('09 - Verifica se ao logar, a pessoa jogadore é direcionada a outra página', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const name = screen.getByTestId('input-player-name');
    const email = screen.getByTestId('input-gravatar-email');
    const playBtn = screen.getByTestId('btn-play')
    userEvent.type(name, 'alguma pessoa jogadora');
    userEvent.type(email, 'email@teste.com');
    userEvent.click(playBtn);
    const gameTitle = screen.getByTestId('settings-title');
    expect(gameTitle).toBeInTheDocument();
  })
  test('10 - Verifica se a tela possui o botão settings na tela do login', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const settingsBtn = screen.getByTestId('btn-settings')
    expect(settingsBtn).toBeInTheDocument();
    userEvent.click(settingsBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/settings');
  })
})
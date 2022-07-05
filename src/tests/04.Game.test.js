import React from 'react';
import App from '../App';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux.js';

describe('Cria testes para tela de Game', () => {
  test('01 - Verifica se a tela possui a imagem de perfil do Gravatar', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/game');
    const avatar = screen.getByTestId('header-profile-picture')
    expect(avatar).toBeInTheDocument();
  })
  test('02 - Verifica se a tela possui o nome do usuário', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/game');
    const name = screen.getByTestId('header-player-name')
    expect(name).toBeInTheDocument();
  })
  test('03 - Verifica se a tela possui o placar do usuário', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/game');
    const score = screen.getByTestId('header-score')
    expect(score).toBeInTheDocument();
  })
  test('04 - Verifica se a categoria da questão está na tela', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/game');
    const questionCategory = screen.getByTestId('question-category')
    expect(questionCategory).toBeInTheDocument();
  })
  test('05 - Verifica se a questão está na tela', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/game');
    const question = screen.getByTestId('question-text')
    expect(question).toBeInTheDocument();
  })
  test('06 - Verifica se a as alternativas estão dentro de uma tag com atributo "answer-options"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/game');
    const answerOptions = screen.getByTestId('answer-options')
    expect(answerOptions).toBeInTheDocument();
  })
})
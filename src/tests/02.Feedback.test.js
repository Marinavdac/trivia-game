import React from 'react';
import App from '../App';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux.js';

describe('Cria testes para tela de Feedback', () => {
  test('01 - Verifica se a tela possui a imagem de perfil do Gravatar', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');
    const avatar = screen.getByTestId('header-profile-picture')
    expect(avatar).toBeInTheDocument();
  })
  test('02 - Verifica se a tela possui o nome do usuário', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');
    const name = screen.getByTestId('header-player-name')
    expect(name).toBeInTheDocument();
  })
  test('03 - Verifica se a tela possui o placar atual do usuário', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');
    const score = screen.getByTestId('header-score')
    expect(score).toBeInTheDocument();
  })
  test('04 - Verifica se a tela possui a mensagem de feedback', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');    
    const message = screen.getByTestId('feedback-text')
    expect(message).toBeInTheDocument();
  })
  test('05 - Verifica se a tela possui o placar final do usuário', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback'); 
    const finalScore = screen.getByTestId('feedback-total-score')
    expect(finalScore).toBeInTheDocument();
  })
  test('06 - Verifica se a tela possui o placar final do usuário', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback'); 
    const totalQuestions = screen.getByTestId('feedback-total-question')
    expect(totalQuestions).toBeInTheDocument();
  })
  test('07 - Verifica se a tela possui o botão para retornar para a tela de login', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback'); 
    const playAgain = screen.getByTestId('btn-play-again')
    userEvent.click(playAgain);
    const loginInput = screen.getByTestId('input-player-name')
    expect(loginInput).toBeInTheDocument();
  })
  test('08 - Verifica se a tela possui o botão quer redireciona para a tela de ranking', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback'); 
    const rankingButton = screen.getByTestId('btn-ranking')
    userEvent.click(rankingButton);
    const rankingTile = screen.getByTestId('ranking-title')
    expect(rankingTile).toBeInTheDocument();
  })
})
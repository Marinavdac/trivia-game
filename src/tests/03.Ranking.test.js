import React from 'react';
import App from '../App';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux.js';

describe('Cria testes para tela de Feedback', () => {
  test('01 - Verifica se a tela possui o título "Ranking"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/ranking');
    const title = screen.getByTestId('ranking-title')
    expect(title).toBeInTheDocument();
  })
  test('02 - Verifica se possui um botão para voltar a tela inicial', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/ranking');
    const btnHome = screen.getByTestId('btn-go-home');
    userEvent.click(btnHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  })
})
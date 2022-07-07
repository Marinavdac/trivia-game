import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles/Settings.css';

class Settings extends Component {
  render() {
    return (
      <div className="trivia-game-screen">
        <h1 data-testid="settings-title">Settings</h1>
        <div className="game-questions settings-page">
          <label htmlFor="categories">
            Category:
            <select name="categories">
              <option value="All">All</option>
              <option value="General Knowledge">General Knowledge</option>
              <option value="Geography">Geography</option>
              <option value="Entertainment">Entertainment</option>
            </select>
          </label>
          <div className="settings-checkbox">
            <label htmlFor="difficulty">
              Difficulty:
              <br />
              <input type="checkbox" name="difficulty" value="all" />
              All
              <input type="checkbox" name="difficulty" value="easy" />
              Easy
              <input type="checkbox" name="difficulty" value="medium" />
              Medium
              <input type="checkbox" name="difficulty" value="hard" />
              Hard
            </label>
          </div>
          <div>
            <label htmlFor="type">
              Questions:
              <select name="type">
                <option value="Any Type">Any Type</option>
                <option value="Multiple choice">Multiple choice</option>
                <option value="True/False">True/False</option>
              </select>
            </label>
          </div>

        </div>

        <button
          type="button"
          className="settings-button-link"
        >
          <Link
            to="/"
          >
            Back

          </Link>
        </button>
      </div>

    );
  }
}
export default Settings;

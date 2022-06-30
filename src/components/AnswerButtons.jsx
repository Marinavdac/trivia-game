import React from 'react';

class AnswerButtons extends React.Component {
  renderButtons = () => {
    const { answers } = this.props;
    console.log('answer inside buttons', answers);
    const btns = answers[0]?.map((answer, index) => (
      <button
      key={ index }
      type="button"
      data-testid={ index === 0 ? 'correct-answer' : `wrong-answer-${index}` }
      >
       {answer}
     </button>
   ));
   return btns;
  }
  
  render() {
   const limit = 0.5;
   return (
     <div data-testid="answer-options">
       {this.renderButtons()?.sort(() => Math.random() - limit)}
     </div>

   );
 }
}

export default AnswerButtons;

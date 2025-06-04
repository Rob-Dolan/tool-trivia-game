import React from 'react';

const Feedback = ({ feedback, onNext }) => {
  return (
    <div className="feedback-container">
      <img src={feedback.tool.image} alt={feedback.tool.name} width="300" />
      <h2>{feedback.correct ? 'Correct!' : 'Incorrect!'}</h2>
      <div className="tool-info">
        <h3 className="tool-name">{feedback.tool.name}</h3>
        <p className="tool-description">{feedback.tool.description}</p>
      </div>
      {feedback.correct && (
        <div className="points-info">
          <p>Points Earned: +{feedback.pointsEarned}</p>
          {feedback.bonus > 0 && <p>Including Bonus: +{feedback.bonus}</p>}
          <p className="total-score">Total Score: {feedback.currentScore}</p>
        </div>
      )}
      <button onClick={onNext}>Next Question</button>
    </div>
  );
};

export default Feedback;
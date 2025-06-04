import React from 'react';

const Question = ({ data, onAnswer }) => {
  if (!data.correct) return null;

  return (
    <div className="question-container">
      <img src={data.correct.image} alt="Tool" width="300" />
      <div className="options-container">
        {data.options.map((option, idx) => (
          <button key={idx} onClick={() => onAnswer(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
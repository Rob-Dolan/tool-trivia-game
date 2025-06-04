import React, { useState, useEffect } from 'react';
import tools from '../data/tools.json';
import { generateQuestion, updateScore } from '../utils/gameLogic';
import Question from './Question';
import Feedback from './Feedback';

const Game = () => {
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [questionCount, setQuestionCount] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [usedTools, setUsedTools] = useState([]);

  // Generate new question when questionCount changes
  useEffect(() => {
    try {
      const newQuestion = generateQuestion(tools, usedTools);
      setCurrentQuestion(newQuestion);
      // Only add to usedTools if it's a new question (not on initial render)
      if (questionCount > 0 || usedTools.length === 0) {
        setUsedTools(prev => [...prev, newQuestion.correct.name]);
      }
    } catch (error) {
      console.error('Error generating question:', error);
      setQuestionCount(10); // End game if we run out of unique tools
    }
  }, [questionCount]); // Remove usedTools from dependency array

  const handleAnswer = (selected) => {
    const isCorrect = selected === currentQuestion.correct.name;
    const isHard = currentQuestion.correct.difficulty === 'hard';

    const { newScore, bonus } = updateScore(score, isCorrect, isHard, streak);
    const newStreak = isCorrect ? streak + 1 : 0;

    setFeedback({
      correct: isCorrect,
      tool: currentQuestion.correct,
      bonus,
      pointsEarned: isCorrect ? (100 + bonus) : 0,
      currentScore: newScore
    });

    setScore(newScore);
    setStreak(newStreak);
  };

  const next = () => {
    setFeedback(null);
    setQuestionCount(q => q + 1);
  };

  const resetGame = () => {
    setUsedTools([]); // Reset used tools first
    setCurrentQuestion(generateQuestion(tools, []));
    setQuestionCount(0);
    setScore(0);
    setStreak(0);
    setFeedback(null);
  };

  if (questionCount >= 10) {
    return (
      <div className="game-over">
        <h2>Game Over!</h2>
        <div className="final-stats">
          <p>Final Score: {score}</p>
        </div>
        <button onClick={resetGame} className="play-again-btn">
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="game-container">
      <div className="score-display">
        <p>Score: {score}</p>
        <p>Question {questionCount + 1}/10</p>
      </div>
      {feedback ? (
        <Feedback feedback={feedback} onNext={next} />
      ) : (
        <Question data={currentQuestion} onAnswer={handleAnswer} />
      )}
    </div>
  );
};

export default Game;
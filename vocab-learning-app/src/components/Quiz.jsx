import React, { useState } from 'react';

function Quiz({ questions, onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);

  const currentQuestion = questions[currentIndex];

  const handleSubmit = (e) => {
    e.preventDefault();

    const isCorrect = userAnswer.trim().toLowerCase() === currentQuestion.answer.toLowerCase();

    if (isCorrect) {
      setScore(score + 1);
      setFeedback({ type: 'correct', message: '정답입니다!' });
    } else {
      setFeedback({
        type: 'incorrect',
        message: `오답입니다. 정답: ${currentQuestion.answer}`
      });
    }

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setUserAnswer('');
        setFeedback(null);
      } else {
        onFinish(score + (isCorrect ? 1 : 0));
      }
    }, 1500);
  };

  const getQuestionTypeLabel = () => {
    return currentQuestion.type === 'en-ko' ? '영어 → 한글' : '한글 → 영어';
  };

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="progress">
          문제 {currentIndex + 1} / {questions.length}
        </div>
        <div className="score">
          점수: {score} / {questions.length}
        </div>
      </div>

      <div className="question-type">
        {getQuestionTypeLabel()}
      </div>

      <div className="question-card">
        <h2>{currentQuestion.question}</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="답을 입력하세요"
          className="answer-input"
          disabled={feedback !== null}
          autoFocus
        />

        <button
          type="submit"
          className="btn btn-primary"
          disabled={!userAnswer.trim() || feedback !== null}
        >
          제출
        </button>
      </form>

      {feedback && (
        <div className={`feedback ${feedback.type}`}>
          {feedback.message}
        </div>
      )}
    </div>
  );
}

export default Quiz;

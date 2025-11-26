import React from 'react';

function Result({ score, totalQuestions, onRestart, onGoHome }) {
  const percentage = Math.round((score / totalQuestions) * 100);

  const getGrade = () => {
    if (percentage >= 90) return { grade: 'A', message: '완벽해요!', emoji: '🎉' };
    if (percentage >= 80) return { grade: 'B', message: '잘했어요!', emoji: '👏' };
    if (percentage >= 70) return { grade: 'C', message: '좋아요!', emoji: '👍' };
    if (percentage >= 60) return { grade: 'D', message: '조금만 더!', emoji: '💪' };
    return { grade: 'F', message: '다시 도전!', emoji: '📚' };
  };

  const gradeInfo = getGrade();

  return (
    <div className="result-container">
      <div className="result-card">
        <div className="result-emoji">{gradeInfo.emoji}</div>
        <h1>학습 완료!</h1>
        <div className="result-score">
          <div className="score-big">{score} / {totalQuestions}</div>
          <div className="score-percentage">{percentage}%</div>
        </div>
        <div className="grade">
          등급: {gradeInfo.grade}
        </div>
        <p className="grade-message">{gradeInfo.message}</p>

        <div className="button-group">
          <button className="btn btn-primary" onClick={onRestart}>
            다시 학습하기
          </button>
          <button className="btn btn-secondary" onClick={onGoHome}>
            홈으로
          </button>
        </div>
      </div>
    </div>
  );
}

export default Result;

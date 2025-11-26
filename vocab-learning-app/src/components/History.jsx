import React from 'react';

function History({ history, onGoBack, onClearHistory }) {
  const getAverageScore = () => {
    if (history.length === 0) return 0;
    const total = history.reduce((sum, record) => sum + record.score, 0);
    return Math.round((total / (history.length * 10)) * 100);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="history-container">
      <div className="history-header">
        <h1>학습 기록</h1>
        <button className="btn btn-back" onClick={onGoBack}>
          ← 뒤로가기
        </button>
      </div>

      {history.length === 0 ? (
        <div className="empty-history">
          <p>아직 학습 기록이 없습니다.</p>
          <button className="btn btn-primary" onClick={onGoBack}>
            학습 시작하기
          </button>
        </div>
      ) : (
        <>
          <div className="history-stats">
            <div className="stat-card">
              <div className="stat-value">{history.length}</div>
              <div className="stat-label">총 학습 횟수</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{getAverageScore()}%</div>
              <div className="stat-label">평균 정답률</div>
            </div>
          </div>

          <div className="history-list">
            {history.map((record, index) => (
              <div key={record.id} className="history-item">
                <div className="history-number">#{history.length - index}</div>
                <div className="history-details">
                  <div className="history-date">{formatDate(record.timestamp)}</div>
                  <div className="history-score">
                    <span className="score-value">{record.score} / 10</span>
                    <span className="score-percentage">
                      ({Math.round((record.score / 10) * 100)}%)
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="btn btn-danger" onClick={onClearHistory}>
            기록 전체 삭제
          </button>
        </>
      )}
    </div>
  );
}

export default History;

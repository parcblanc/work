import React from 'react';

function Home({ onStartQuiz, onViewHistory }) {
  return (
    <div className="home-container">
      <h1>영어 단어 학습</h1>
      <p>구글 스프레드시트의 단어로 퀴즈를 풀어보세요!</p>

      <div className="button-group">
        <button className="btn btn-primary" onClick={onStartQuiz}>
          학습 시작
        </button>
        <button className="btn btn-secondary" onClick={onViewHistory}>
          학습 기록 보기
        </button>
      </div>

      <div className="info-box">
        <h3>사용 방법</h3>
        <ul>
          <li>한 세션당 10개의 단어가 랜덤으로 출제됩니다</li>
          <li>영어 단어가 나오면 한글 뜻을 입력하세요</li>
          <li>한글 단어가 나오면 영어 단어를 입력하세요</li>
          <li>모든 점수는 자동으로 기록됩니다</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;

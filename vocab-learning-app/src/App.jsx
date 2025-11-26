import { useState, useEffect } from 'react';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Result from './components/Result';
import History from './components/History';
import { loadVocabularyData, getRandomQuestions } from './utils/dataLoader';
import './App.css';

const STORAGE_KEY = 'vocab-learning-history';

function App() {
  const [screen, setScreen] = useState('home'); // home, quiz, result, history
  const [vocabulary, setVocabulary] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem(STORAGE_KEY);
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Failed to load history:', e);
      }
    }
  }, []);

  // Save history to localStorage
  const saveHistory = (newHistory) => {
    setHistory(newHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
  };

  const handleStartQuiz = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await loadVocabularyData();
      setVocabulary(data);

      const quizQuestions = getRandomQuestions(data, 10);
      setQuestions(quizQuestions);
      setScreen('quiz');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleQuizFinish = (score) => {
    setCurrentScore(score);

    // Save to history
    const newRecord = {
      id: Date.now(),
      timestamp: Date.now(),
      score: score
    };

    const newHistory = [...history, newRecord];
    saveHistory(newHistory);

    setScreen('result');
  };

  const handleRestart = () => {
    const quizQuestions = getRandomQuestions(vocabulary, 10);
    setQuestions(quizQuestions);
    setScreen('quiz');
  };

  const handleGoHome = () => {
    setScreen('home');
    setError(null);
  };

  const handleViewHistory = () => {
    setScreen('history');
  };

  const handleClearHistory = () => {
    if (window.confirm('정말로 모든 학습 기록을 삭제하시겠습니까?')) {
      saveHistory([]);
    }
  };

  return (
    <div className="app">
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner">로딩 중...</div>
        </div>
      )}

      {error && (
        <div className="error-overlay">
          <div className="error-message">
            <h2>오류 발생</h2>
            <p>{error}</p>
            <p className="error-hint">
              구글 스프레드시트가 공개로 설정되어 있는지 확인해주세요.
              <br />
              (공유 → 링크가 있는 모든 사용자로 설정)
            </p>
            <button className="btn btn-primary" onClick={handleGoHome}>
              홈으로 돌아가기
            </button>
          </div>
        </div>
      )}

      {!loading && !error && (
        <>
          {screen === 'home' && (
            <Home onStartQuiz={handleStartQuiz} onViewHistory={handleViewHistory} />
          )}

          {screen === 'quiz' && (
            <Quiz questions={questions} onFinish={handleQuizFinish} />
          )}

          {screen === 'result' && (
            <Result
              score={currentScore}
              totalQuestions={10}
              onRestart={handleRestart}
              onGoHome={handleGoHome}
            />
          )}

          {screen === 'history' && (
            <History
              history={history}
              onGoBack={handleGoHome}
              onClearHistory={handleClearHistory}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;

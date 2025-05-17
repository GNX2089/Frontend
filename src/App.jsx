import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import Leaderboard from './Components/Leaderboard';
import Enquiry from './API/Enquiry';

function App() {
  const [score, setScore] = useState(0);
  const [firstname, setFirstname] = useState('Loading...');
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const handleScoreUpdate = (event) => {
      const { points } = event.detail;
      if (points !== undefined) {
        setScore(points);
      }
    };

    window.addEventListener('updateScore', handleScoreUpdate);
    return () => {
      window.removeEventListener('updateScore', handleScoreUpdate);
    };
  }, []);

  const handleClick = () => {
    const newScore = score + 1;
    setScore(newScore);
    window.dispatchEvent(new CustomEvent('updateScoreFromApp', { detail: { points: newScore } }));
  };

  return (
    <div className='App'>
      <Enquiry score={score} setScore={setScore} setFirstname={setFirstname} setLeaderboard={setLeaderboard} />
      {showLeaderboard ? (
        <Leaderboard setShowLeaderboard={setShowLeaderboard} leaderboard={leaderboard} />
      ) : (
        <>
          <div className='header'>
            <h1 className='firstname'><span id='firstname'>{firstname}</span></h1>
          </div>
          <div className='content'>
            <div className='score-container'>
              <h2 className='score'><span id='score'>{score}</span></h2>
            </div>
            <div className='button-container'>
              <button className='button-click' onClick={handleClick}>Click Me</button>
            </div>
          </div>
          <div className='footer'>
            <button className='btn-leaderboard' onClick={() => setShowLeaderboard(true)}>
              <FontAwesomeIcon icon={faTrophy} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;

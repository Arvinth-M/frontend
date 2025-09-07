import { useState, useCallback, useRef } from 'react';
import Hole from './Hole';

const Game = () => {
  const [score, setScore] = useState(0);
  const [timeUp, setTimeUp] = useState(false);
  const [lastHole, setLastHole] = useState(null);
  const [activeHole, setActiveHole] = useState(null);
  const timeUpRef = useRef(false);

  const randomTime = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
  };

  const randomHole = useCallback(() => {
    const holes = [1, 2, 3, 4, 5, 6];
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
      return randomHole();
    }
    setLastHole(hole);
    return hole;
  }, [lastHole]);

  const peep = useCallback(() => {
    const time = randomTime(300, 1500);
    const hole = randomHole();
    setActiveHole(hole);
    
    setTimeout(() => {
      setActiveHole(null);
      if (!timeUpRef.current) {
        peep();
      }
    }, time);
  }, [randomHole]);

  const startGame = () => {
    setScore(0);
    setTimeUp(false);
    timeUpRef.current = false;
    setActiveHole(null);
    setLastHole(null);
    peep();
    setTimeout(() => {
      setTimeUp(true);
      timeUpRef.current = true;
    }, 10000);
  };

  const bonk = (holeNumber) => {
    if (activeHole === holeNumber) {
      setScore(prevScore => prevScore + 1);
      setActiveHole(null);
    }
  };

  return (
    <div>
      <h1>Whack a mole! <span className="score">{score}</span></h1>
      <button onClick={startGame}>Start!</button>
      
      {timeUp && (
        <div className="game-over">
          <h2>Game Over!</h2>
          <p>Final Score: {score}</p>
        </div>
      )}
      
      <div className="game">
        {[1, 2, 3, 4, 5, 6].map(holeNumber => (
          <Hole
            key={holeNumber}
            holeNumber={holeNumber}
            isActive={activeHole === holeNumber}
            onMoleClick={() => bonk(holeNumber)}
          />
        ))}
      </div>
    </div>
  );
};

export default Game;

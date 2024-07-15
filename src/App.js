import { useState } from 'react';
import { Board } from './components/Board';
import './App.css';

function App() {
  const [, setReset] = useState(false);
  const [winner, setWinner] = useState("");

  const resetGame = () => {
    setReset(true);
  };

  return (
    <div className="App">
      {winner}
      <Board
        setReset={setReset}
        winner={winner}
        setWinner={setWinner}
      />
      <button type='button' onClick={() => resetGame()}>Reset</button>
    </div>
  );
}

export default App;

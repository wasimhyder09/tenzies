import {useState, useEffect} from 'react'
import Die from './components/Die'
import './App.css';

function App() {

  function allNewDice() {
    const newDice = []
    for(let i=1; i<= 10; i++) {
      newDice.push({
        value: (Math.floor(Math.random() * 6) + 1),
        isHeld: false
      })
    }
    return newDice;
  }

  const[dice, setDice] = useState(allNewDice())

  const diceElements = dice.map(die => <Die value={die.value} />)

  function rollDice() {
    setDice(allNewDice())
  }

  return (
    <div className="container">
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-dice" onClick={rollDice}>
        Roll
      </button>
    </div>
  );
}

export default App;

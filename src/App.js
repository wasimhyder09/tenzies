import {useState, useEffect} from 'react'
import Die from './components/Die'
import {nanoid} from 'nanoid'
import './App.css';

function App() {

  function allNewDice() {
    const newDice = []
    for(let i=1; i<= 10; i++) {
      newDice.push({
        value: (Math.floor(Math.random() * 6) + 1),
        isHeld: false,
        id: nanoid()
      })
    }
    return newDice;
  }

  const[dice, setDice] = useState(allNewDice())

  const diceElements = dice.map(die => <Die key={die.id} value={die.value} />)

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

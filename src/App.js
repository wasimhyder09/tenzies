import {useState, useEffect} from 'react'
import Die from './components/Die'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'
import './App.css';

function App() {

  function allNewDice() {
    const newDice = []
    for(let i=1; i<= 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice;
  }

  function generateNewDie() {
    return {
      value: (Math.floor(Math.random() * 6) + 1),
      isHeld: false,
      id: nanoid()
    }
  }

  const[dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    let firstDie = dice[0].value
    let heldCount = 0
    dice.forEach((die) => {
      if(die.isHeld === true && die.value === firstDie) {
        heldCount++
      }
    })
    if(heldCount == 10) {
      setTenzies(true)
    }
  }, [dice])

  const diceElements = dice.map(die => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ))

  function rollDice() {
    if(tenzies) {
      setDice(allNewDice())
    }
    else {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld === true ? die : generateNewDie()
      }))
    }
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ?
        {...die, isHeld: !die.isHeld} :
        die
    }))
  }


  return (
    <div className="container">
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "Reset Game" : "Roll"}
      </button>
    </div>
  );
}

export default App;

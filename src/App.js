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
  const [rolls, setRolls] = useState(0)
  const[timer, setTimer] = useState(0)
  const bestTime = localStorage.getItem('bestTime')

  useEffect(() => {
    if(!tenzies) {
      setTimeout(()=>setTimer(timer + 1), 1000)
    }
  },[timer])


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
      if(bestTime && timer < bestTime) {
        localStorage.setItem('bestTime', timer)
      }
      else if(!bestTime) {
        localStorage.setItem('bestTime', timer)
      }
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
      setTenzies(false)
      setDice(allNewDice())
      setRolls(0)
      setTimer(0)
    }
    else {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld === true ? die : generateNewDie()
      }))
      setRolls(prevRolls => prevRolls + 1)
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
      {bestTime && <div className="best-timer">Best time: {new Date(bestTime * 1000).toISOString().substring(14, 19)}</div>}
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <h1 className="title timer">{new Date(timer * 1000).toISOString().substring(14, 19)}</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "Reset Game" : "Roll"}
      </button>
      <div className="number-of-rolls">
        <h2 className="roll-title">Number of rolls</h2>
        <h1 className="roll-count">{rolls}</h1>
      </div>
    </div>
  );
}

export default App;

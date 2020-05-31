import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ text, clickHandler }) => {
  return <button onClick={clickHandler}>{text}</button>
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  const getRandomAnecdote = (arrayLength) => {
    setSelected(Math.floor(Math.random() * arrayLength));
  }

  const vote = (index) => {
    const copyOfPoints = [ ...points ];
    copyOfPoints[index] = copyOfPoints[index] + 1;
    setPoints(copyOfPoints);
  }

  const getTopAnecdote = () => {
    return points.indexOf(Math.max(...points));
  }  

  return (
    <>
      <div>
        <h1>Anecdote of the day</h1>
        {props.anecdotes[selected]}
      </div>
      <div>
        <Button
          text="vote"
          clickHandler={() => vote(selected)}
        />
        <Button
          text="next anecdote"
          clickHandler={() => getRandomAnecdote(anecdotes.length)} />
      </div>
      <h1>Anecdote with most votes</h1>
      {props.anecdotes[(getTopAnecdote())]}
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
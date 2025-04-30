import { useState } from 'react'
import Button from './components/Button'
import DisplayAnecdote from './components/DisplayAnecdote'
import Header from './components/Header'

const maxVotes = (votes) => {
  const result = Math.max(...votes)
  return votes.indexOf(result)
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  
  const handleAnecdote = () => {
    const newSelection = Math.floor(Math.random() * (anecdotes.length))
    setSelected(newSelection)
  }

  const handleVote = () => {
    const newVote = [...votes]
    newVote[selected] = newVote[selected] + 1
    setVotes(newVote)
  }
  const maxVote = maxVotes(votes)
  
  return (
    <div>
      <Header text='Anecdote of the day'/>
      <DisplayAnecdote anecdote={anecdotes[selected]} votes={votes[selected]}/>
      <Button onClick={handleVote} text='vote'/>
      <Button onClick={handleAnecdote} text='next anecdote'/>
      <Header text='Anecdote with most votes'/>
      <DisplayAnecdote anecdote={anecdotes[maxVote]} votes={votes[maxVote]}/>
    </div>
  )
}

export default App  
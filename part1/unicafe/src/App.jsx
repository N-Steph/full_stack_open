import { useState } from "react"
import { createLogger } from "vite"

const Header = ({text}) => {
  return (
    <h2>{text}</h2>
  )
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = ({text, value}) => {
  if (text == 'positive') {
    return (
      <>
      <td>{text}</td>
      <td>{value} %</td>
      </>
    )
  }
  return (
    <>
    <td>{text}</td>
    <td>{value}</td>
    </>
  )
}

const Statistics = ({stats}) => {
  const [good, neutral, bad] = stats
  const totalFeedback = good + neutral + bad
  const average = (good * 1 + bad * -1) / totalFeedback
  const positive = (good * 1 / totalFeedback) * 100
  if (totalFeedback === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <>
    <table>
      <tbody>
        <tr>
          <StatisticLine text='good' value={good}/>
        </tr>
        <tr>
          <StatisticLine text='neutral' value={neutral}/>
        </tr>
        <tr>
          <StatisticLine text='bad' value={bad}/>
        </tr>
        <tr>
          <StatisticLine text='all' value={totalFeedback}/>
        </tr>
        <tr>
          <StatisticLine text='average' value={average}/>
        </tr>
        <tr>
          <StatisticLine text='positive' value={positive}/>
        </tr>
      </tbody>
    </table>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <Header text='give feedback'/>
      <Button text='good' onClick={handleGoodClick} />
      <Button text='neutral' onClick={handleNeutralClick} />
      <Button text='bad' onClick={handleBadClick} />
      <Header text='statistics'/>
      <Statistics stats={[good, neutral, bad]}/>
    </div>
  )
}

export default App
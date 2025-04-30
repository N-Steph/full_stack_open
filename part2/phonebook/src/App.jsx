import { useState } from 'react'

const Filter = (props) => {
  return (
    <div>
      filter shown with: <input
            value={props.search}
            onChange={props.handleSearch}
          />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.onSubmit}>
        <div>
          name: <input 
              value={props.newName}
              onChange={props.handleNewName}
              />
        </div>
        <div>
          number: <input 
                value={props.newNumber}
                onChange={props.handleNewNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Person = (props) => {
  return (
  <div>
    {props.match.map(person => <p key={person.id}>{person.name} {person.number}</p>)}
  </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '39-44-5323523', id: 1},
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [match, setMatch] = useState([])

  const addPerson = (event) => {
    event.preventDefault()
    const personExist = persons.map(person => person.name.toLowerCase()).includes(newName.toLowerCase())
    if (personExist) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const newObject = { name: newName, number: newNumber, id: persons.length + 1}
    setPersons(persons.concat(newObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNewName = (event) => setNewName(event.target.value)
  const handleNewNumber = (event) => setNewNumber(event.target.value)
  const handleSearch = (event) => {
    const searchValue = event.target.value
    let newMatch
    if (searchValue !== '') {
      newMatch = persons.filter(person => person.name.toLowerCase().search(searchValue.toLowerCase()) !== -1)
    }
    else {
      newMatch = []
    }
    setMatch(newMatch)
    setSearch(searchValue)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch} />
      <h2>add a new</h2>
      <PersonForm 
          onSubmit={addPerson}
          newName={newName}
          handleNewName={handleNewName}
          newNumber={newNumber}
          handleNewNumber={handleNewNumber}/>
      <h2>Numbers</h2>
      <Person match={match}/>
    </div>
  )
}

export default App
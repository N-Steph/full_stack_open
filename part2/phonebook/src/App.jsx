import { useState, useEffect } from 'react'
import services from './services/persons'

const ErrorNotification = ({message}) => {
  const successStyle = {
      color: 'red',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    }
  
  if (message === null) {
    return null
  }
  return (
    <div style={successStyle}>
      {`${message}`}
    </div>
  )
}

const SuccessNotification = ({message}) => {
  const errorStyle = {
      color: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }
  
  if (message === null) {
    return null
  }
  return (
    <div style={errorStyle}>
      {`${message}`}
    </div>
  )
}

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
    {props.match.map(person => {
      return (
        <div key={person.id}>
        {person.name} {person.number}
        <button onClick={() => props.handleDeletion(person.name, person.id)}>delete</button>
        </div>
      )
    })}
  </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [match, setMatch] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  
  useEffect(() => {
    services.getAll().then(response => {
      setPersons(response.data)
    })}, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personExist = persons.map(person => person.name.toLowerCase()).includes(newName.toLowerCase())
    if (personExist) {
      confirm(`${newName} is already added to the phonebook, replace old number with a new one?`)
      const existPerson = persons.filter(person => person.name.toLowerCase() == newName.toLowerCase())
      const newPersonNumber = {...existPerson[0], number: newNumber}
      services
        .update(newPersonNumber)
        .then(response => {
          const newPersons = persons.map(person => {
            if (person.name === response.data.name) {
              return response.data
            }
            return person
          })
          const existMatch = match.filter(person => person.name.toLowerCase() == newName.toLowerCase())
          if (existMatch.length !== 0) {
            const newMatch = match.map(person => {
              if (person.name === response.data.name) {
                return response.data
              }
              return person
            })
            setMatch(newMatch)
          }
          setPersons(newPersons)
          setSuccessMessage(`${response.data.name} number updated`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setErrorMessage(`Information of ${newName} has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      return
    }
    
    const newObject = { name: newName, number: newNumber}
    services.postPerson(newObject).then(response => {
      services.getAll().then(response => {
        setPersons(response.data)
        setSuccessMessage(`Added ${newObject.name}`)
      })
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      setNewName('')
      setNewNumber('')
    })
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

  const handleDeletion = (name, id) => {
    if (!confirm(`Delete ${name} ?`)) {
      return
    }
    services
      .deletePerson(id)
      .then(response => {
        const updatePersons = match.filter(person => person.id !== id)
        const updatePersonsGlobal = persons.filter(person => person.id !== id)
        setPersons(updatePersonsGlobal)
        setSuccessMessage(`Deleted ${name}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
        setMatch(updatePersons)
      })
      .catch(error => {
        setErrorMessage(`${name} already deleted`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={successMessage}/>
      <ErrorNotification message={errorMessage}/>
      <Filter search={search} handleSearch={handleSearch}/>
      <h2>add a new</h2>
      <PersonForm 
          onSubmit={addPerson}
          newName={newName}
          handleNewName={handleNewName}
          newNumber={newNumber}
          handleNewNumber={handleNewNumber}/>
      <h2>Numbers</h2>
      <Person match={match} handleDeletion={handleDeletion}/>
    </div>
  )
}

export default App
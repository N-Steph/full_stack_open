require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()

persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    // {
    //     "id": "4",
    //     "name": "Mary Poppendieck",
    //     "number": "39-23-6423122"
    // }
]

morgan.token('data', function getPostData(req) {
    return JSON.stringify(req.body)
})
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/info', (request, response) => {
    const numberOfPerson = persons.length
    response.send(`
        <p>Phonebook has info of ${numberOfPerson} people<p>
        <p>${Date()}</p>
        `)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const personFound = persons.filter(person => person.id === id)
    if (personFound.length === 0) {
        return response.status(404).end()
    }
    response.json(personFound)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const newPerson = request.body
    if (!newPerson.name || newPerson.name.length === 0 || !newPerson.number || newPerson.number.length === 0) {
        return response.status(400).json({ error: 'name and number must be stated' })
    }
    // const result = persons.map(person => person.name.toLowerCase()).filter(name => name === newPerson.name.toLowerCase())
    // if (result.length !== 0) {
    //     return response.status(400).json({ error: 'name must be unique' })
    // }
    // const id = Math.floor((Math.random() * 2000))
    // persons = persons.concat({ id: String(id), ...newPerson })
    const name = newPerson.name
    const number = newPerson.number
    const person = new Person({
        name: name,
        number: number
    })
    person.save().then(result => {
        response.json(result)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
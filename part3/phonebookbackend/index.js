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
    Person.find({}).then(result => {
        const numberOfPerson = persons.length
        return response.send(`
            <p>Phonebook has info of ${numberOfPerson} people<p>
            <p>${Date()}</p>
            `)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findById(id)
        .then(result => {
            if (result) {
                return response.json(result)
            }
            else {
                return response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findByIdAndDelete(id).then(result => {
        response.status(204).end
    }).catch(error => next(error))

    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const newPerson = request.body
    const name = newPerson.name
    const number = newPerson.number
    if (!name || name.length === 0 || !number || number.length === 0) {
        return response.status(400).json({ error: 'name and number must be stated' })
    }
    Person.find({ name: name }).then(result => {
        if (result) {
            Person.findOneAndUpdate({ name: name }, { $set: { name: name, number: number } })
                .then(result => {
                    response.status(204).end()
                })
        }
        else {
            const person = new Person({
                name: name,
                number: number
            })
            return person.save().then(result => {
                response.json(result)
            })
        }
    })

})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give a password')
    process.exit(1)
}
const password = process.argv[2]

const url = `mongodb+srv://N-Steph:${password}@cluster0.ryvhsfs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(url)

const schemaPerson = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', schemaPerson)


if (process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}
else if (process.argv.length > 3 & process.argv.length < 5) {
    console.log('give name and phone number')
    mongoose.connection.close()
    process.exit(1)
}
else if (process.argv.length > 3) {
    const name = process.argv[3]
    const number = process.argv[4]
    const person = new Person({
        name: name,
        number: number
    })
    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}
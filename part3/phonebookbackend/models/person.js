const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
// if (process.argv.length < 3) {
//     console.log('give a password')
//     process.exit(1)
// }
// const password = process.argv[2]

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })


const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = mongoose.model('Person', personSchema)


// if (process.argv.length === 3) {
//     Person.find({}).then(result => {
//         console.log('phonebook:')
//         result.forEach(person => {
//             console.log(`${person.name} ${person.number}`)
//         })
//         mongoose.connection.close()
//     })
// }
// else if (process.argv.length > 3 & process.argv.length < 5) {
//     console.log('give name and phone number')
//     mongoose.connection.close()
//     process.exit(1)
// }
// else if (process.argv.length > 3) {
//     const name = process.argv[3]
//     const number = process.argv[4]
//     const person = new Person({
//         name: name,
//         number: number
//     })
//     person.save().then(result => {
//         console.log(`added ${name} number ${number} to phonebook`)
//         mongoose.connection.close()
//     })
// }
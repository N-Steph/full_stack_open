import axios from 'axios'

const baseUrl = 'http://localhost:3002/api/persons'

const getAll = () => axios.get(baseUrl)

const postPerson = (newPerson) => axios.post(baseUrl, newPerson)

const deletePerson = (id) => axios.delete(`${baseUrl}/${id}`)

const update = (person) => axios.put(`${baseUrl}/${person.id}`, person)

export default {getAll, postPerson, deletePerson, update}
import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'
const loginUrl = 'http://localhost:3003/api/login'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const postCredentials = async (credentials) => {
  const response = await axios.post(loginUrl, credentials)
  return response.data
}

export default { getAll, postCredentials }
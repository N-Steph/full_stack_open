import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'
const loginUrl = 'http://localhost:3003/api/login'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const postCredentials = async (credentials) => {
  try {
    const response = await axios.post(loginUrl, credentials)
    return response.data
  }
  catch (error) {
    return null 
  }
}

const postBlogDetails = async (blogDetails, token) => {
  try {
    const response = await axios.post(baseUrl, blogDetails, { headers: {
      'Authorization': `Bearer ${token}`
    }})
    return { data: response.data, status: response.status }
  }
  catch (error) {
    return {data: null, status: error.status}
  }
}

const updateLikes = async (id, blogDetails) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, blogDetails)
    return {data: response.data, status: response.status}
  }
  catch (error) {
    return {data: null, status: error.status} 
  }
}

const deleteBlog = async (id, token) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`, {
      headers: {'Authorization': `Bearer ${token}`}
    })
    return {data: response.data, status: response.status}
  }
  catch (error) {
    return {data: null, status: error.status}
  }
}

export default { getAll, postCredentials, postBlogDetails, updateLikes, deleteBlog }
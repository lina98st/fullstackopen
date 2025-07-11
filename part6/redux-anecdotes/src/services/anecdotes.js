import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'



export const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

export const createNew = async (content) => {
    const newObject = { content, votes: 0 }
    const response = await axios.post(baseUrl, newObject)
    return response.data
}

export const updateAnecdoteOnServer = async (anecdote) => {
    const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
    return response.data
}

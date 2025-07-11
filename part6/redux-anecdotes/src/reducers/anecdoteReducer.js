import { createSlice } from '@reduxjs/toolkit'
import { getAll, createNew, updateAnecdoteOnServer } from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    updateAnecdote(state, action) {
      const updated = action.payload
      return state.map(a => a.id !== updated.id ? a : updated)
    },
    vote(state, action) {
      const id = action.payload
      const anecdote = state.find(a => a.id === id)
      if (!anecdote) return state
      const updated = { ...anecdote, votes: anecdote.votes + 1 }
      return state.map(a => a.id !== id ? a : updated)
    }
  }
})

export const { setAnecdotes, appendAnecdote, updateAnecdote, vote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const state = getState()
    const anecdoteToUpdate = state.anecdotes.find(a => a.id === id)
    const updatedAnecdote = {
      ...anecdoteToUpdate,
      votes: anecdoteToUpdate.votes + 1
    }
    const returnedAnecdote = await updateAnecdoteOnServer(updatedAnecdote)
    dispatch(updateAnecdote(returnedAnecdote))
  }
}

export default anecdoteSlice.reducer

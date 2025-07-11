import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { content: 'If it hurts, do it more often', id: '1', votes: 0 },
  { content: 'Adding manpower to a late software project makes it later!', id: '2', votes: 0 },
]

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    vote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      if (anecdoteToChange) {
        anecdoteToChange.votes += 1
      }
    },
    createAnecdote(state, action) {
      const content = action.payload
      state.push({
        content,
        id: (Math.random() * 1000000).toFixed(0),
        votes: 0
      })
    }
  }
})

export const { vote, createAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer

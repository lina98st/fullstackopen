import { useState, useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import AppNotification from './components/AppNotification'
import { getAll, createNew, updateAnecdoteOnServer } from './services/anecdotes'
import NotificationContext from './components/NotificationContext'

const App = () => {
  const [filter, setFilter] = useState('')
  const queryClient = useQueryClient()
  const { dispatch } = useContext(NotificationContext)

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: false
  })

  const voteMutation = useMutation({
    mutationFn: updateAnecdoteOnServer,
    onSuccess: () => {
      queryClient.invalidateQueries(['anecdotes'])
    }
  })

  const newAnecdoteMutation = useMutation({
    mutationFn: createNew,
    onSuccess: () => {
      queryClient.invalidateQueries(['anecdotes'])
    }
  })

  const handleVote = (anecdote) => {
    const updated = { ...anecdote, votes: anecdote.votes + 1 }
    voteMutation.mutate(updated)

    dispatch({ type: 'SET_NOTIFICATION', payload: `you voted '${anecdote.content}'` })
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
  }

  const addAnecdote = (content) => {
    if (content.length < 5) {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: 'too short anecdote, must have length 5 or more'
      })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
      return
    }

    newAnecdoteMutation.mutate(content, {
      onSuccess: () => {
        queryClient.invalidateQueries(['anecdotes'])
        dispatch({ type: 'SET_NOTIFICATION', payload: `you created '${content}'` })
        setTimeout(() => {
          dispatch({ type: 'CLEAR_NOTIFICATION' })
        }, 5000)
      },
      onError: (error) => {
        dispatch({
          type: 'SET_NOTIFICATION',
          payload: error.response?.data?.error || 'an error occurred while creating anecdote'
        })
        setTimeout(() => {
          dispatch({ type: 'CLEAR_NOTIFICATION' })
        }, 5000)
      }
    })
  }



  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h2>Anecdotes</h2>
      <AppNotification />
      <Filter filter={filter} setFilter={setFilter} />
      <AnecdoteList anecdotes={anecdotes} filter={filter} onVote={handleVote} />
      <AnecdoteForm addAnecdote={addAnecdote} />
    </div>
  )
}

export default App

import { useSelector, useDispatch } from 'react-redux'
import { useMemo } from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(({ anecdotes, filter }) => {
        if (filter === '') {
            return anecdotes
        }
        return anecdotes.filter(a =>
            a.content.toLowerCase().includes(filter.toLowerCase())
        )
    })

    const sortedAnecdotes = useMemo(() => {
        return [...anecdotes].sort((a, b) => b.votes - a.votes)
    }, [anecdotes])

    if (sortedAnecdotes.length === 0) {
        return <div>No matching results</div>
    }

    return (
        <>
            {sortedAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button
                            onClick={() => {
                                dispatch(vote(anecdote.id))
                                dispatch(showNotification(`you voted '${anecdote.content}'`, 5))
                            }}
                        >
                            vote
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList

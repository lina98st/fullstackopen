import { useMemo } from 'react'

const AnecdoteList = ({ anecdotes, filter, onVote }) => {

    const filteredAnecdotes = anecdotes.filter(a =>
        a.content.toLowerCase().includes(filter.toLowerCase())
    )

    const sortedAnecdotes = useMemo(() => {
        return [...filteredAnecdotes].sort((a, b) => b.votes - a.votes)
    }, [filteredAnecdotes])

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
                        <button onClick={() => onVote(anecdote)}>
                            vote
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList

const AnecdoteForm = ({ addAnecdote }) => {
    const handleSubmit = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value

        if (content.length >= 5) {
            addAnecdote(content)
            event.target.anecdote.value = ''
        } else {
            addAnecdote(content)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input name="anecdote" />
            <button type="submit">create</button>
        </form>
    )
}

export default AnecdoteForm

const Notification = ({ message }) => {
    if (!message) return null

    const style = {
        color: message.type === 'error' ? 'red' : 'green',
        background: '#eee',
        fontSize: 16,
        border: `2px solid ${message.type === 'error' ? 'red' : 'green'}`,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    return (
        <div style={style}>
            {message.message}
        </div>
    )
}

export default Notification

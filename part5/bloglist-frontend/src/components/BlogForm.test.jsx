import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import BlogForm from './BlogForm'

test('calls createBlog with correct details when form is submitted', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const titleInput = screen.getByPlaceholderText('title')
    const authorInput = screen.getByPlaceholderText('author')
    const urlInput = screen.getByPlaceholderText('url')
    const createButton = screen.getByText('create')

    await user.type(titleInput, 'React testing')
    await user.type(authorInput, 'Alina Dev')
    await user.type(urlInput, 'https://example.com')
    await user.click(createButton)

    expect(createBlog).toHaveBeenCalledTimes(1)
    expect(createBlog.mock.calls[0][0]).toEqual({
        title: 'React testing',
        author: 'Alina Dev',
        url: 'https://example.com'
    })
})

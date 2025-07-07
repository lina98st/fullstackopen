import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { vi } from 'vitest'

test('renders title and author, but not url or likes by default', () => {
    const blog = {
        title: 'Testing React Components',
        author: 'Alina Dev',
        url: 'https://example.com',
        likes: 10,
        user: {
            username: 'alina'
        }
    }

    const currentUser = { username: 'alina' }

    render(<Blog blog={blog} updateBlog={() => { }} deleteBlog={() => { }} currentUser={currentUser} />)

    const summary = screen.getByText('Testing React Components Alina Dev')
    expect(summary).toBeDefined()

    const url = screen.queryByText('https://example.com')
    expect(url).toBeNull()

    const likes = screen.queryByText('likes 10')
    expect(likes).toBeNull()
})

test('shows url and likes when view button is clicked', async () => {
    const blog = {
        title: 'Testing React Components',
        author: 'Alina Dev',
        url: 'https://example.com',
        likes: 10,
        user: {
            username: 'alina'
        }
    }

    const currentUser = { username: 'alina' }

    render(<Blog blog={blog} updateBlog={() => { }} deleteBlog={() => { }} currentUser={currentUser} />)

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    expect(screen.getByText('https://example.com')).toBeDefined()
    expect(screen.getByText('likes 10')).toBeDefined()
})

test('like button calls event handler twice when clicked twice', async () => {
    const blog = {
        title: 'Testing React Components',
        author: 'Alina Dev',
        url: 'https://example.com',
        likes: 10,
        user: {
            username: 'alina'
        }
    }

    const currentUser = { username: 'alina' }
    const mockUpdateBlog = vi.fn()

    const user = userEvent.setup()

    render(
        <Blog
            blog={blog}
            updateBlog={mockUpdateBlog}
            deleteBlog={() => { }}
            currentUser={currentUser}
        />
    )


    const viewButton = screen.getByText('view')
    await user.click(viewButton)


    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockUpdateBlog).toHaveBeenCalledTimes(2)
})

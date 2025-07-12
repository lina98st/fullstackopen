import { useState, useEffect, useRef } from 'react'
import './App.css'

import { useUserValue, useUserDispatch } from './UserContext'
import { useNotificationDispatch } from './NotificationContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Menu from './components/Menu'

import { Routes, Route, Link } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import BlogView from './components/BlogView'

import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const user = useUserValue()
  const userDispatch = useUserDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()
  const notificationDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const { data: blogs = [] } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const updateBlogMutation = useMutation({
    mutationFn: ({ id, updatedBlog }) => blogService.update(id, updatedBlog),
    onSuccess: updatedBlog => {
      queryClient.setQueryData(['blogs'], oldBlogs => {
        return oldBlogs.map(blog =>
          blog.id === updatedBlog.id ? updatedBlog : blog
        )
      })
    },
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'SET', payload: user })
      blogService.setToken(user.token)
    }
  }, [userDispatch])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      userDispatch({ type: 'SET', payload: user })
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (error) {
      notificationDispatch({
        type: 'SET',
        payload: { message: 'wrong credentials', type: 'error' },
      })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    userDispatch({ type: 'CLEAR' })
  }

  const addBlog = blogObject => {
    newBlogMutation.mutate(blogObject)
    blogFormRef.current.toggleVisibility()
    notificationDispatch({
      type: 'SET',
      payload: {
        message: `a new blog ${blogObject.title} by ${blogObject.author} added`,
        type: 'success',
      },
    })
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' })
    }, 5000)
  }

  const likeBlog = blog => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id || blog.user,
    }
    updateBlogMutation.mutate({ id: blog.id, updatedBlog })
  }

  const deleteBlog = blog => {
    if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      deleteBlogMutation.mutate(blog.id)
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              data-testid="username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              data-testid="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <Notification />
         <Menu handleLogout={handleLogout} />
<Routes>
  <Route path="/" element={
    <>
      <h2>blogs</h2>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            deleteBlog={() => deleteBlog(blog)}
            currentUser={user}
            likeBlog={likeBlog}
          />
        ))}
    </>
  } />
  
  <Route path="/users" element={<Users />} />
  <Route path="/users/:id" element={<User />} />
    <Route path="/blogs/:id" element={<BlogView />} />
</Routes>


    </div>
  )
}

export default App

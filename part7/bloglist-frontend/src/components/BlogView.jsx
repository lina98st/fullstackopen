import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useUserValue } from '../UserContext'
import { useState } from 'react'

const BlogView = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const currentUser = useUserValue()

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  const likeMutation = useMutation({
    mutationFn: updatedBlog => blogService.update(updatedBlog.id, updatedBlog),
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
    }
  })

  const deleteMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
      navigate('/')
    }
  })

  if (isLoading) return <div>Loading...</div>

  const blog = blogs.find(b => b.id === id)
  if (!blog) return <div>Blog not found</div>

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id || blog.user, // falls user ein Objekt ist
    }
    likeMutation.mutate(updatedBlog)
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteMutation.mutate(blog.id)
    }
  }

  const [comment, setComment] = useState('')

const commentMutation = useMutation({
  mutationFn: ({ id, content }) => blogService.comment(id, content),
  onSuccess: () => {
    queryClient.invalidateQueries(['blogs']) 
    setComment('') 
  },
})

return (
  <div>
    <h2>{blog.title} {blog.author}</h2>
    <a href={blog.url}>{blog.url}</a>
    <p>
      {blog.likes} likes
      <button onClick={handleLike}>like</button>
    </p>
    <p>added by {blog.user?.name || 'unknown'}</p>
    {blog.user?.username === currentUser?.username && (
      <button onClick={handleDelete}>remove</button>
    )}

<h3>comments</h3>
<form onSubmit={e => {
  e.preventDefault()
  commentMutation.mutate({ id: blog.id, content: comment })
}}>
  <input
    type="text"
    value={comment}
    onChange={({ target }) => setComment(target.value)}
  />
  <button type="submit">add comment</button>
</form>

<ul>
  {(blog.comments || []).map((c, index) => (
    <li key={index}>{c}</li>
  ))}
</ul>

  </div>
)

}

export default BlogView

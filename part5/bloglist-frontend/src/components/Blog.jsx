import { useState } from 'react'
import PropTypes from 'prop-types'


const Blog = ({ blog, updateBlog, deleteBlog, currentUser }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const like = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id || blog.user
    }

    updateBlog(updatedBlog)
  }

  const handleDelete = () => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      <div className="blog-summary">
        {blog.title} {blog.author}
        <button className="blog-details" onClick={toggleVisibility}>

          {visible ? 'hide' : 'view'}
        </button>
      </div>

      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button onClick={like}>like</button>
          </div>
          <div>{blog.user?.name || blog.user?.username}</div>
          {blog.user?.username === currentUser.username && (
            <button onClick={handleDelete}>remove</button>
          )}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired
}


export default Blog
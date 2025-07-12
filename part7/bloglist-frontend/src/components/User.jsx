import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'

const User = () => {
  const { id } = useParams()

  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }


  
console.log('users:', users)
console.log('id from params:', id)

const user = users?.find(u => u._id === id)



  if (!user) {
    return <div>User not found</div>
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User

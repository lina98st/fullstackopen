import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'

const Users = () => {
  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
  })

  return (
    <div>
      <h2>Users</h2>
      <table>
<tbody>
  {users.map(user => (
  <tr key={user._id}>
  <td>
    <Link to={`/users/${user._id}`}>{user.name}</Link>
  </td>

      <td>{user.blogs.length}</td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  )
}

export default Users

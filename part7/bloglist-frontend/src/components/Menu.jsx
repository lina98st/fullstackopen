import { Link } from 'react-router-dom'
import { useUserValue, useUserDispatch } from '../UserContext'

const Menu = ({ handleLogout }) => {
  const user = useUserValue()

  const style = {
    padding: 5,
    background: '#eee',
    borderBottom: '1px solid #ccc',
    marginBottom: 10
  }

  return (
    <div style={style}>
      <Link to="/" style={{ marginRight: 10 }}>blogs</Link>
      <Link to="/users" style={{ marginRight: 10 }}>users</Link>
      {user && (
        <>
          {user.name} logged in
          <button onClick={handleLogout} style={{ marginLeft: 10 }}>logout</button>
        </>
      )}
    </div>
  )
}

export default Menu

import { useSelector, useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import AppNotification from './components/AppNotification'



const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AppNotification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}


export default App
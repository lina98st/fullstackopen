import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'



const App = () => {
  const [persons, setPersons] = useState([
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)



  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  const checkDoubleName = () => {
    return persons.some(person => person.name === newName)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }


  const handleSubmit = (event) => {
    event.preventDefault()


    const existingPerson = persons.find(p => p.name === newName)

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with the new one?`
      )


      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber }

        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p =>
              p.id !== existingPerson.id ? p : returnedPerson
            ))
            setNewName('')
            setNewNumber('')
            setNotification(`Updated ${newName}'s number`)
            setTimeout(() => setNotification(null), 5000)
          })
          .catch(error => {
            setErrorMessage(`Information of ${newName} has already been removed from the server`)
            setTimeout(() => setErrorMessage(null), 5000)
            setPersons(persons.filter(p => p.id !== existingPerson.id))
          })
      }
      return
    }


    const newPerson = { name: newName, number: newNumber }


    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleDelete = (id, name) => {
    const confirmDelete = window.confirm(`Delete ${name}?`)
    if (confirmDelete) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification} type="success" />
      <Notification message={errorMessage} type="error" />


      <Filter value={filter} onChange={handleFilterChange} />

      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} onDelete={handleDelete} />

    </div>
  )
}

export default App

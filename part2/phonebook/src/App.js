import React, { useState, useEffect } from 'react';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';
import Notification from './components/Notification';
import personService from './services/persons';
import './index.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const handleNewNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(person => person.name === newName);

    if (!existingPerson) {
      const newPerson = { name: newName, number: newNumber };

      personService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('');
          setNewNumber('');
          setNotification(
            {
              text: `Added ${newName}`,
              isError: false,
            }

          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)

        })
    } else {
      const confirmed = window.confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`);
      if (confirmed) {
        const newPerson = { name: newName, number: newNumber };
        personService.update(existingPerson.id, newPerson)
          .then(response => {
            setPersons((persons.map(person => person.id !== existingPerson.id ? person : { ...person, number: response.number })));
            setNewName('');
            setNewNumber('');
            setNotification(
              {
                text: `${newName} updated`,
                isError: false,
              }

            )
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch((error) => {
            setPersons(persons.filter(p => p.id !== existingPerson.id))
            setNotification(
              {
                text: `Information for ${newName} has already been removed from server`,
                isError: true,
              }

            )
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
      }
    }
  }

  const deletePerson = (event, person) => {
    const confirmed = window.confirm(`Delete ${person.name}?`);
    if (confirmed) {
      personService.deletePerson(person.id)
        .then(status => {
          if (status === 204) {
            setPersons(persons.filter(filteredPerson => filteredPerson.id !== person.id));
          }
        })
    }
  }

  const personsToShow = filter.length > 0 ?
    persons.filter((person) => {
      return person.name.toLowerCase().includes(filter);
    })
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        notification={notification}
      />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNewNameChange={handleNewNameChange}
        newNumber={newNumber}
        handleNewNumberChange={handleNewNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={personsToShow}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App
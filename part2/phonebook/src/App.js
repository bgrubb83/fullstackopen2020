import React, { useState, useEffect } from 'react';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    personService
      .getAll('http://localhost:3001/persons')
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
        })
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  }

  const deletePerson = (event, person) => {
    const confirmed = window.confirm(`Delete ${person.name}?`);
    if (confirmed) {
      personService.deletePerson(person.id)
        .then(status => {
          if (status === 200) {
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
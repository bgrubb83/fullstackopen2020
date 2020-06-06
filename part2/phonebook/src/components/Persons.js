import React from 'react';
import Person from './Person';

const Persons = ({ persons, deletePerson }) => {
  return persons.map(person => {
    return <Person person={person} key={person.name} deletePerson={deletePerson} />
  }
  )
}

export default Persons;
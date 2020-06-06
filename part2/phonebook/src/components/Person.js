import React from 'react';

const Person = ({ person, deletePerson }) => {
  return (
    <>
      <p key={person.name}>{person.name} {person.number}</p>
      <button onClick={(event) => deletePerson(event, person)}>delete</button>
    </>
  )
}

export default Person;
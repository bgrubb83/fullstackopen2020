import React from 'react'

const PersonForm = ({ addPerson, newName, handleNewNameChange, newNumber, handleNewNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
      <h1>add a new</h1>
      <div>
        name: <input value={newName} onChange={handleNewNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNewNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm;
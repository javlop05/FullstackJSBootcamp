import React, { useState } from 'react'
import Toggable from './Toggable';

export default function NoteForm({ addNote, handleLogout }) {
  const [newNote, setNewNote] = useState('');

  const handleChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const noteObject = {
      content: newNote,
      important: false
    };

    addNote(noteObject);
    setNewNote('');
  }

  return (
    <Toggable buttonLabel='New note'>
      <form onSubmit={handleSubmit}>
        <input type='text' onChange={handleChange} value={newNote}/>
        <button>Add note</button>
      </form>
      <div>
        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </Toggable>
  )
}

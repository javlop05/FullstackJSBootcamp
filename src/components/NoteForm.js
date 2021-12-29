import React, { useRef, useState } from 'react'
import Toggable from './Toggable';

export default function NoteForm({ addNote, handleLogout }) {
  const [newNote, setNewNote] = useState('');
  const toggableRef = useRef();

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
    toggableRef.current.toggleVisibility();
  }

  return (
    <Toggable buttonLabel='New note' ref={toggableRef}>
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

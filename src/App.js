import React from 'react';
import { useState, useEffect } from 'react';
import Note from './components/Note';
import { getAll, create, update } from './services/notes';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    setLoading(true);

    getAll()
      .then(data => {
        setNotes(data);
        setLoading(false);
      });
  }, []);

  const handleChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const noteToAddToState = {
      id: notes.length + 1,
      content: newNote,
      important: false
    };

    setError('');
    create(noteToAddToState)
      .then(newNote => {
        setNotes((prevNotes) => [...prevNotes, newNote]);
      })
      .catch((error) => {
        setError(error);
      });
  
    setNewNote('');
  };

  const updateNote = (id) => {
    const noteToUpdateIndex = notes.findIndex((note) => note.id === id);
    const noteToUpdate = notes[noteToUpdateIndex];
    const newNote = {...noteToUpdate, important: !noteToUpdate.important };
    
    update(id, newNote)
      .then(newNote => {
        setNotes((prevNotes) => {
          prevNotes[noteToUpdateIndex] = newNote;
          return [...prevNotes];
        });
      })
      .catch((error) => {
        setError(error);
      });
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important);

  return (
    <div>
      <h1>Notes</h1>
      {loading ?
        'Loading notes...' :
        <React.Fragment>
          <button onClick={() => setShowAll(!showAll)}>
            {showAll ? 'Show important' : 'Show all' }
          </button>
          <ol>
            {notesToShow.map(note =>
              <Note
                key={note.id}
                content={note.content}
                important={note.important}
                onClick={() => updateNote(note.id)}/>
            )}
          </ol>
        </React.Fragment>
      }

      <form onSubmit={handleSubmit}>
        <input type='text' onChange={handleChange} value={newNote}/>
        <button>Add note</button>
      </form>

      {error ? <span style={{color: 'red'}}>{error}</span>: ''}
    </div>
  )
}

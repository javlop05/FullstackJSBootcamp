import { useState, useEffect } from 'react';
import Note from './components/Note';
import { getAll, create, update } from './services/notes';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
    console.log('Crear nota');
    const noteToAddToState = {
      id: notes.length + 1,
      title: newNote,
      body: newNote
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

  return (
    <div>
      {loading ?
        'Loading notes...' :
        <ol>
          {notes.map(note =>
            <Note
              key={note.id}
              title={note.title}
              body={note.body} />
          )}
        </ol>
      }

      <form onSubmit={handleSubmit}>
        <input type='text' onChange={handleChange} value={newNote}/>
        <button>Add note</button>
      </form>

      {error ? <span style={{color: 'red'}}>{error}</span>: ''}
    </div>
  )
}

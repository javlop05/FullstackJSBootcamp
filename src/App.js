import React from 'react';
import { useState, useEffect } from 'react';
import Note from './components/Note';
import { getAll, create, update, setToken } from './services/notes';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import NoteForm from './components/NoteForm';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showAll, setShowAll] = useState(true);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    setLoading(true);

    getAll()
      .then(data => {
        setNotes(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setToken(user.token);
    }
  }, [])

  const handleLogout = () => {
    setUser(null);
    setToken(user.token);
    window.localStorage.removeItem('loggedNoteAppUser');
  }

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password
      });
      
      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user));

      setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (e) {
      setError('Wrong credentials');
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  const addNote = (noteObject) => {
    setError('');

    create(noteObject)
      .then(newNote => {
        setNotes((prevNotes) => [...prevNotes, newNote]);
      })
      .catch((error) => {
        setError(error);
      });
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

      {user
        ? <NoteForm
            addNote={addNote}
            handleLogout={handleLogout}
            />
        : <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={(event) => handleLogin(event)}
            />
      }

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

      {error ? <span className='error' style={{color: 'red'}}>{error}</span>: ''}
    </div>
  )
}

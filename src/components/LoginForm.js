import React from 'react';
import Toggable from './Toggable';

export default function LoginForm({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleSubmit
}) {

  return (
    <Toggable buttonLabel='Show Login'>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type='text'
            value={username}
            name='Username'
            placeholder='Username'
            autoComplete="username"
            onChange={handleUsernameChange}/>
        </div>
        <div>
          <input
            type='password'
            value={password}
            name='Password'
            placeholder='Password'
            autoComplete='current-password'
            onChange={handlePasswordChange}/>
        </div>

        <button>Login</button>
      </form>
    </Toggable>
  )
}

import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [gists, setGists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUsernameChnage = value => {
    console.log('value: ' , value)
    setUsername(value)
  }

  const handleSubmit = () => {
    console.log('submit username: ' , username);
    setLoading(true);
    return fetch(`https://api.github.com/users/${username}/gists`)
      .then(res => {
        if (res.status !== 200) throw new Error(['Server error.']);;
        return res.json();
      })
      .then( gists => {
        console.log('gists: ', gists);
        setGists(gists)
        setLoading(false);
        setError('')
      })
      .catch(err => {
        console.log('error: ', err.message);
        setError(err.message)
        setLoading(false);
      })
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input type="text" onChange={({ target }) => handleUsernameChnage(target.value)}/>
        {error && <p>{error}</p>}
        <button type="button" onClick={() => handleSubmit()}>Get gists</button>
      </header>
    </div>
  );
}

export default App;

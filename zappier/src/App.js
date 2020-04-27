import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import moment from 'moment';
import github from './services/github';

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
    return github.getGistsByUsername(username)
      .then( gists => {
        console.log('gists: ', gists);
        setGists(gists)
        setLoading(false);
        setError('')
      })
      .catch(err => {
        console.log('error: ', err.message);
        setGists([])
        setError(err.message)
        setLoading(false);
      })
  }

  const gistList = gists.length ? gists.map(gist => {
    return <li key={gist.id}>{gist.description} - {moment(gist.created_at).format('LLL')}</li>
  }) : [];


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input type="text" onChange={({ target }) => handleUsernameChnage(target.value)}/>
        {error ? <p>{error}</p> : null}
        {gists.length ? <ul>{gistList}</ul> : null}
        {loading ? <p>Loading...</p> : null}
        <button type="button" onClick={() => handleSubmit()}>Get gists</button>
      </header>
    </div>
  );
}

export default App;

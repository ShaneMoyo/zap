import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';

import github from './services/github';
import Search from './components/search';
import Gist from './components/gist';

function App() {
  const [username, setUsername] = useState('');
  const [gists, setGists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUsernameChnage = value => {
    setUsername(value)
  }

  const handleSubmit = () => {
    setLoading(true);
    return github.getGistsByUsername(username)
      .then( gists => {
        console.log('gists: ', gists);
        setGists(gists)
        setLoading(false);
        setError('')
      })
      .catch(err => {
        setGists([])
        setError(err.message)
        setLoading(false);
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/gist/123">About</Link>
              </li>

            </ul>
          </nav>
        <div>
          <Switch>
            <Route path="/gist/:id">
              <Gist/>
            </Route>
            <Route path="/">
              <Search
                loading={loading}
                error={error}
                username={username}
                handleUsernameChnage={handleUsernameChnage}
                handleSubmit={handleSubmit}
                gists={gists}/>
            </Route>
          </Switch>
        </div>
      </Router>
      </header>
    </div>
  );
}

export default App;

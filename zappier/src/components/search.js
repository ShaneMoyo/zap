import React from 'react';
import moment from 'moment';
import {
  useParams,
  Link
} from "react-router-dom";

export default function Search({ handleUsernameChnage, handleSubmit, error, gists, loading}) {

  const gistList = gists.length ? gists.map(gist => {
    return (
      <li key={gist.id}>
        <Link to={`/gist/${gist.id}`}>
          {gist.description} - {moment(gist.created_at).format('LLL')}
        </Link>
      </li>
    )
  }) : [];

  return(
    <>
      <input type="text" onChange={({ target }) => handleUsernameChnage(target.value)}/>
      {error ? <p>{error}</p> : null}
      {gists.length ? <ul>{gistList}</ul> : null}
      {loading ? <p>Loading...</p> : null}
      <br/>
      <button type="button" onClick={() => handleSubmit()}>Get gists</button>
    </>
  )
}

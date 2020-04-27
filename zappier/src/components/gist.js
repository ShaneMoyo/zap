import React, { useState, useEffect } from 'react';
import {
  useParams,
  Link
} from "react-router-dom";
import github from '../services/github'


export default function Gist() {
  let { id } = useParams();
  const [gist, setGist] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function fetchGist() {
    setError('')
    setLoading(true);
    try {
      const response = await github.getGistDetail(id)
      setGist(gist)
      setLoading(false);
    } catch (error){
      setError(error.message)
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchGist();
  }, [gist]);

  return (
    <h1>Gist Detail</h1>
  )
}

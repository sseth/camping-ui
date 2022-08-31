import { createGlobalStyle } from 'styled-components/macro';
import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';

import Main from './components/Main';
import Login from './components/Login';
import Header from './components/Header';

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000';
// axios.defaults.baseURL = 'https://aqueous-temple-20353.herokuapp.com';

ReactModal.setAppElement('#root');

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    box-sizing: border-box;

    font-family: 'Open Sans', sans-serif;
  }
`;

export default function App() {
  const [authenticated, setAuthenticated] = useState(
    !!localStorage.getItem('credentials')
  );
  const [parks, setParks] = useState([]);

  const getParks = async () => {
    // setTimeout(async () => {
    console.log('getting parks');
    const res = await axios('/parks');
    setParks(res.data.parks);
    // }, 5000)
  };

  useEffect(() => {
    if (!authenticated) return;

    const [username, password] = localStorage.getItem('credentials').split(':');
    axios.defaults.auth = { username, password };
    getParks();
  }, [authenticated]);

  return (
    <>
      <GlobalStyle />
      <Header />
      {authenticated ? (
        <Main data={parks} refresh={getParks} />
      ) : (
        <Login authenticate={() => setAuthenticated(true)} />
      )}
    </>
  );
}

/*
  index.css:
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    code {
      font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
    }
 */

// logo color: #4ecca3, font: circular

import { createGlobalStyle } from 'styled-components/macro';
import { useState, useEffect } from 'react';
import ReactModal from 'react-modal';

import Main from './components/Main';
import Login from './components/Login';
import Header from './components/Header';

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5001';
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
    // TODO: add fallback
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

// package.json
// "homepage": "https://sseth.github.io/camping-ui",

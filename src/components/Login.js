import styled from 'styled-components/macro';
import React from 'react';
import axios from 'axios';

const Container = styled.h1`
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export default function Login({ authenticate }) {
  const [form, setForm] = React.useState({ user: '', pass: '' });

  const update = (e) => {
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
  };

  const login = async () => {
    try {
      const response = await axios.get('/login', {
        auth: {
          username: form.user,
          password: form.pass,
        },
      });

      if (response.status === 200) {
        localStorage.setItem('credentials', `${form.user}:${form.pass}`);
        authenticate();
      }
    } catch (error) {
      console.log(error.response.status);
      console.log('invalid credentials');
    }
  };

  const enter = (e) => {
    if (e.key === 'Enter') {
      const t = e.target;
      if (t.name === 'user') t.nextElementSibling.focus();
      else t.nextElementSibling.click();
    }
  };

  return (
    <Container>
      <input
        type="text"
        name="user"
        value={form.user}
        onChange={update}
        onKeyDown={enter}
      />
      <input
        type="password"
        name="pass"
        value={form.pass}
        onChange={update}
        onKeyDown={enter}
      />
      <button onClick={login}>login</button>
    </Container>
  );
}

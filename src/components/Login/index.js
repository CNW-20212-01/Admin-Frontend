import React, { useState } from 'react';

const API_AUTH_ENDPOINT = process.env.REACT_APP_API_AUTH_ENDPOINT;

const Login = ({ setIsAuthenticated }) => {
  const adminEmail = 'admin@gmail.com';
  const adminPassword = 'admin';

  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('admin');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === adminEmail && password === adminPassword) {
      alert('Login successfully!');

      localStorage.setItem('is_authenticated', true);
      setIsAuthenticated(true);

      const params = {
        email: email,
        password: password
      }

      await fetch(API_AUTH_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(params)
      })
      .then(res => res.json())
      .then(data => localStorage.setItem('bearer_token', data.token))
      .catch(error => alert(error));
    } else {
      alert('Incorrect email or password!');
    }
  };

  return (
    <div className="small-container">
      <form onSubmit={handleLogin}>
        <h1>Administrator Login</h1>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="admin@gmail.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input style={{ marginTop: '12px' }} type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;

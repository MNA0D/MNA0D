import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Cookies from 'js-cookie';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const apiUrl = process.env.REACT_APP_API;
    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        // Créez un cookie avec les informations de l'utilisateur
        Cookies.set('token', data.token, { expires: 1 }); // Expire dans 1 jour
        // Redirigez l'utilisateur vers la page d'accueil ou une autre page
        window.location.href = '/';
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Une erreur est survenue');
      }
    } catch (error) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <>
      <Helmet>
        <title>Espace de connexion - MNA0D</title>
      </Helmet>
      <link href="/assets/css/signin.css" rel="stylesheet" />
      <div className="text-center" id="tbody">
        <main className="form-signin">
          <form onSubmit={handleSubmit}>
            <img className="mb-4" src="/assets/image/logo.png" alt="" width="150" height="150" />
            <h1 className="h3 mb-3 fw-normal">Merci de vous connecter pour accéder à MNA0D</h1>

            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="floatingInput">Utilisateur ou email</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="floatingPassword">Mot de passe</label>
            </div>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <button className="w-100 btn btn-lg btn-primary" type="submit">Se connecter</button>
            <p className="mt-5 mb-3 text-muted">&copy; 2024-2025</p>
          </form>
        </main>
      </div>
    </>
  );
}

export default Login;

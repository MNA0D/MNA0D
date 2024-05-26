import React from 'react';

function Login() {
  return (
    <>
      <link href="/assets/css/signin.css" rel="stylesheet" />
      <div className="text-center" id="tbody">
        <main className="form-signin">
          <form>
            <img className="mb-4" src="https://github.com/naywvi.png" alt="" width="72" height="57" />
            <h1 className="h3 mb-3 fw-normal">Merci de vous connecter</h1>

            <div className="form-floating">
              <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
              <label htmlFor="floatingInput">Utilisateur ou email</label>
            </div>
            <div className="form-floating">
              <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
              <label htmlFor="floatingPassword">Mot de passe</label>
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">Se connecter</button>
            <p className="mt-5 mb-3 text-muted">&copy; 2024-2025</p>
          </form>
        </main>
      </div>
    </>
  )
}

export default Login;
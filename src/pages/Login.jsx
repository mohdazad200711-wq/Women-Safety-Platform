import React from 'react';

const Login = () => {
  return (
    <main>
      <section className="section">
        <div className="form-card">
          <h2>Sign in to your account</h2>
          <p>Access the safety dashboard and send alerts instantly.</p>
          <form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" placeholder="Enter your password" />
            </div>
            <button className="btn" type="submit">Login</button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Login;

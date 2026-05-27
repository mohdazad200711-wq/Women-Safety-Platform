import React from 'react';

const Register = () => {
  return (
    <main>
      <section className="section">
        <div className="form-card">
          <h2>Create your safety account</h2>
          <p>Register now to join the network and access emergency assistance features.</p>
          <form>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input id="name" type="text" placeholder="Enter your full name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" placeholder="Choose a secure password" />
            </div>
            <button className="btn" type="submit">Register</button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Register;

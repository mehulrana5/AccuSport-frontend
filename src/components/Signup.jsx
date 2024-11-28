import React, { useContext, useState } from 'react';
import AppContext from '../Context';
import css from './Signup.module.css'

const Signup = () => {

  const [cred, setCred] = useState({
    email: "",
    password: "",
    roles:"player"
  });

  const context = useContext(AppContext)

  const handleCredChange = (event) => {setCred({ ...cred, [event.target.id]: event.target.value });};

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(cred);    
    // context.register(cred);
  };

  return (
    <div className="container-1">
      <h2 className="form-heading">Sign up</h2>
      <form onSubmit={handleSubmit} className={css.container_1}>
        <div className="form-group">
          <label htmlFor="email">
            <h3>Email</h3>
          </label>
          <input
            type='email'
            id="email"
            onChange={handleCredChange}
            className="form-input"
            required
          />
          <label htmlFor="password">
            <h3>Password</h3>
          </label>
          <input
            type="password"
            id="password"
            className="form-input"
            value={cred.password}
            onChange={handleCredChange}
            required
          />
          <h3>Select Role</h3>
          <select name="roles" id="roles" className='form-input' onChange={handleCredChange}>
            <option value="p">Player</option>
            <option value="o">Organizer</option>
          </select>
        </div>
        <div className={css.container_2}>
          <button type="submit" className={css.blue_btn}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;

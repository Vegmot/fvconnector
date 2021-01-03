import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authAction';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const changeHandler = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitHandler = async e => {
    e.preventDefault();
    login(email, password);
  };

  // redirect if authenticated
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <>
      <h1 className='large text-primary'>Sign in</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Sign into your account
      </p>
      <form className='form' onSubmit={e => submitHandler(e)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={e => changeHandler(e)}
            required
          />
        </div>

        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={e => changeHandler(e)}
            minLength='6'
          />
        </div>

        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign up</Link>
      </p>
    </>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  // state.{...}Reducer is defined in indexReducer.js in /reducers
  isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);

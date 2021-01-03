import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alertAction';
import { register } from '../../actions/authAction';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const {
    firstName,
    middleName,
    lastName,
    email,
    password,
    confirmPassword,
  } = formData;

  const changeHandler = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitHandler = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ firstName, middleName, lastName, email, password });
    }
  };

  // redirect if authenticated
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <>
      <h1 className='large text-primary'>Sign up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create your account
      </p>
      <form className='form' onSubmit={submitHandler}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='First name'
            name='firstName'
            value={firstName}
            onChange={changeHandler}
          />
          <small className='form-text'>* Required field</small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Middle name'
            name='middleName'
            value={middleName}
            onChange={changeHandler}
          />
          <small className='form-text'>(If applicable, optional)</small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Last name'
            name='lastName'
            value={lastName}
            onChange={changeHandler}
          />
          <small className='form-text'>* Required field</small>
        </div>

        <div className='form-group'>
          <input
            type='email'
            placeholder='Email address'
            name='email'
            value={email}
            onChange={changeHandler}
          />
          <small className='form-text'>* Required field</small>
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>

        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={changeHandler}
            minLength='6'
          />
          <small className='form-text'>* Required field</small>
        </div>

        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={changeHandler}
            minLength='6'
          />
          <small className='form-text'>* Required field</small>
        </div>

        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign in</Link>
      </p>
    </>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  // state.{...}Reducer is defined in indexReducer.js in /reducers
  isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);

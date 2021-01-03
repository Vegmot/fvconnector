import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profileAction';

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    city: '',
    state: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const {
    company,
    title,
    city,
    state,
    from,
    to,
    current,
    description,
  } = formData;

  const onChangeHandler = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <>
      <h1 className='large text-primary'>Add an experience</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Add any professional positions
        that you have had in the past
      </p>
      <small>*: Required</small>
      <form
        className='form'
        onSubmit={e => {
          e.preventDefault();
          addExperience(formData, history);
        }}
      >
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Enter job title...'
            name='title'
            value={title}
            onChange={e => onChangeHandler(e)}
            required
          />
          <small className='form-text'>
            Automatically capitalise the first letters
          </small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='* Enter company...'
            name='company'
            value={company}
            onChange={e => onChangeHandler(e)}
            required
          />
          <small className='form-text'>
            Automatically capitalise the first letters
          </small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Enter city...'
            name='city'
            value={city}
            onChange={e => onChangeHandler(e)}
          />
          <small className='form-text'>
            Automatically capitalise the first letters
          </small>
        </div>

        <div className='form-group'>
          <select name='state' value={state} onChange={e => onChangeHandler(e)}>
            <option value='0'>Select state...</option>
            <option value='CA'>CA</option>
            <option value='NY'>NY</option>
            <option value='WA'>WA</option>
            <option value='OR'>OR</option>
            <option value='TX'>TX</option>
            <option value='MI'>MI</option>
            <option value='NV'>NV</option>
            <option value='FL'>FL</option>
          </select>
        </div>

        <div className='form-group'>
          <h4>From:</h4>
          <input
            type='date'
            name='from'
            value={from}
            onChange={e => onChangeHandler(e)}
          />
        </div>

        <div className='form-group'>
          <p>
            <input
              type='checkbox'
              name='current'
              checked={current}
              value={current}
              onChange={e => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
            />{' '}
            Currently working
          </p>
        </div>

        <div className='form-group'>
          <h4>To:</h4>
          <input
            type='date'
            name='to'
            value={to}
            disabled={toDateDisabled ? 'disabled' : ''}
            onChange={e => onChangeHandler(e)}
          />
        </div>

        <div className='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Please describe what you did...'
            value={description}
            onChange={e => onChangeHandler(e)}
          ></textarea>
        </div>

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(withRouter(AddExperience));

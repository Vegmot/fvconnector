import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profileAction';

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = formData;

  const onChangeHandler = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <>
      <h1 className='large text-primary'>Add education info</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Add any educational institutions
        that you have attended
      </p>
      <small>*: Required</small>
      <form
        className='form'
        onSubmit={e => {
          e.preventDefault();
          addEducation(formData, history);
        }}
      >
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Enter school...'
            name='school'
            value={school}
            onChange={e => onChangeHandler(e)}
            required
          />
          <small className='form-text'>
            Automatically capitalise the first letters
          </small>
        </div>

        <div className='form-group'>
          <select
            name='degree'
            value={degree}
            onChange={e => onChangeHandler(e)}
            required
          >
            <option value='0'>Select degree...</option>
            <option value='Associate'>Associate</option>
            <option value='Bachelor'>Bachelor</option>
            <option value='Graduate'>Graduate</option>
            <option value='Master'>Master</option>
            <option value='Doctoral'>Doctoral</option>
          </select>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Enter field of study...'
            name='fieldofstudy'
            value={fieldofstudy}
            onChange={e => onChangeHandler(e)}
          />
          <small className='form-text'>
            Automatically capitalise the first letters
          </small>
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
            Currently attending
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(withRouter(AddEducation));

import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profileAction';

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    city: '',
    state: '',
    status: '',
    favourites: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const {
    company,
    website,
    city,
    state,
    status,
    favourites,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const changeHandler = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitHandler = e => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <>
      <h1 className='large text-primary'>Create your profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Please let us know who you are
      </p>
      <small>*: Required | FV: Fruits and Veggies</small>
      <form className='form' onSubmit={e => submitHandler(e)}>
        <div className='form-group'>
          <select name='status' value={status} onChange={e => changeHandler(e)}>
            <option value='0'>* Select status</option>
            <option value='Aspiring newborn FV lover'>
              Aspiring newborn FV lover
            </option>
            <option value='Junior FV lover'>Junior FV lover</option>
            <option value='Senior FV lover'>Senior FV lover</option>
            <option value='Master FV lover'>Master FV lover</option>
            <option value='Legendary FV lover'>Legendary FV lover</option>
            <option value='Epic FV lover'>Epic FV lover</option>
            <option value='Mythical FV lover'>Mythical FV lover</option>
            <option value='FV itself with human body'>
              FV itself with human body
            </option>
          </select>
          <small className='form-text'>
            Give us an idea of where you are at in your career
          </small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Enter company...'
            name='company'
            value={company}
            onChange={e => changeHandler(e)}
          />
          <small className='form-text'>
            Could be your own company or one you work for
          </small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Enter website address...'
            name='website'
            value={website}
            onChange={e => changeHandler(e)}
          />
          <small className='form-text'>
            Could be your own or a company website
          </small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Enter city...'
            name='city'
            value={city}
            onChange={e => changeHandler(e)}
          />
        </div>

        <div className='form-group'>
          <select name='state' value={state} onChange={e => changeHandler(e)}>
            <option value='0'>* Select state</option>
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
          <input
            type='text'
            placeholder='Enter your favourite fruits or veggies...'
            name='favourites'
            value={favourites}
            onChange={e => changeHandler(e)}
          />
          <small className='form-text'>
            Please use comma-separated values (eg. Banana, Blueberry, Kale,
            Cabbage, ...)
          </small>
        </div>

        <div className='form-group'>
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            value={bio}
            onChange={e => changeHandler(e)}
          ></textarea>
          <small className='form-text'>Tell us a little about yourself</small>
        </div>

        <div className='my-2'>
          <button
            type='button'
            className='btn btn-light'
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
          >
            Add Social Network Links
          </button>
          <span>(Optional)</span>
        </div>

        {displaySocialInputs && (
          <>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x'></i>
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={e => changeHandler(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x'></i>
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={e => changeHandler(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x'></i>
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
                onChange={e => changeHandler(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x'></i>
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                value={linkedin}
                onChange={e => changeHandler(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x'></i>
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={e => changeHandler(e)}
              />
            </div>
          </>
        )}

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

// withRouter is needed as we are using history.push
export default connect(null, { createProfile })(withRouter(CreateProfile));

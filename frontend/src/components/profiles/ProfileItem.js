import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    user: { _id, firstName, middleName, lastName, avatar },
    status,
    company,
    city,
    state,
    favourites,
  },
}) => {
  return (
    <div className='profile bg-light'>
      <img src={avatar} alt={firstName} className='round-img' />
      <div>
        <h2>
          {firstName} {middleName && middleName} {lastName}{' '}
          {user.isAdmin && ' | Admin'}
        </h2>
        <p>** {status} **</p>
        <p>{company && <span> Working at {company}</span>}</p>
        <p className='my-1'>{city ? city + ', ' + state : state}</p>
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View details
        </Link>
      </div>
      <ul>
        {favourites.slice(0, 4).map((fav, index) => (
          <li key={index} className='text-primary'>
            <i className='fas fa-check'></i> {fav}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;

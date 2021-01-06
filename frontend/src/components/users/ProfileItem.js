import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  user: { _id },
  profile: { status, company, city, state, favourites },
}) => {
  return (
    <>
      <div className='profile bg-light'>
        <p>
          <i className='fas fa-seedling'></i> {status}
        </p>
        <p>
          {company && (
            <>
              <i className='fas fa-seedling'></i>
              <span> Working at {company}</span>
            </>
          )}
        </p>
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
    </>
  );
};

ProfileItem.propTypes = {
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;

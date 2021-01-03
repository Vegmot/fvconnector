import React from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profile: {
    bio,
    favourites,
    user: { firstName, middleName, lastName },
  },
}) => {
  return (
    <div className='profile-about bg-light p-2'>
      {bio && (
        <>
          <h2 className='text-primary'>
            {firstName} {middleName && middleName} {lastName}'s bio
          </h2>
          <p>{bio}</p>
        </>
      )}

      <div className='line'></div>
      <h2 className='text-primary'>{firstName}'s favourite fruits & veggies</h2>
      <div className='skills'>
        <div className='p-1'>
          {favourites.map((fav, index) => (
            <div className='p-1' key={index}>
              <i className='fa fa-check'></i> {fav}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;

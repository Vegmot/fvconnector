import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfiles } from '../../actions/profileAction';

const UserItem = ({
  user: { _id, avatar, firstName, middleName, lastName, isAdmin },
  profile: { profiles },
  getProfiles,
}) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <>
      <div className='user profile bg-light'>
        <img src={avatar} alt={firstName} className='round-img' />
        <div>
          <h2>
            {firstName} {middleName && middleName} {lastName}{' '}
            {isAdmin && <i className='fas fa-check'></i>}
          </h2>
          {profiles.find(profile => profile.user === _id) ? (
            profiles
              .filter(profile => profile.user === _id)
              .map(pro => (
                <>
                  <p>{pro.status}</p>
                  <p>{pro.company && <span>Working at {pro.company}</span>}</p>
                  <p>
                    {pro.city ? (
                      <span>
                        {pro.city}, {pro.state}
                      </span>
                    ) : (
                      <span>{pro.state}</span>
                    )}
                  </p>
                  <Link to={`/profile/${_id}`} className='btn btn-primary my-1'>
                    View details
                  </Link>
                  <ul>
                    {pro.favourites.slice(0, 4).map((fav, index) => (
                      <li key={index} className='text-primary'>
                        <i className='fas fa-check'></i> {fav}
                      </li>
                    ))}
                  </ul>
                </>
              ))
          ) : (
            <>
              <p>
                <i className='fas fa-times' style={{ color: 'red' }}></i> This
                user has no profile{' '}
                <i className='fas fa-times' style={{ color: 'red' }}></i>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profileReducer,
});

export default connect(mapStateToProps, { getProfiles })(UserItem);

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profileAction';

const Profiles = ({
  getProfiles,
  profile: { profiles, loading },
  auth: { isAuthenticated },
}) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  return (
    <>
      {isAuthenticated ? (
        loading ? (
          <Spinner />
        ) : (
          <>
            <h1 className='large text-primary'>All FV lovers</h1>
            <p className='lead'>
              <i className='fab fa-connectdevelop'></i> Browse and connect with
              others
            </p>
            <div className='profiles'>
              {profiles.length > 0 ? (
                profiles.map(pro => <ProfileItem key={pro._id} profile={pro} />)
              ) : (
                <h4>No profiles found</h4>
              )}
            </div>
          </>
        )
      ) : (
        <Redirect to='/login' />
      )}
    </>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profileReducer,
  auth: state.authReducer,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);

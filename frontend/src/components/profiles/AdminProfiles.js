import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profileAction';

const AdminProfiles = ({
  getProfiles,
  profile: { profiles, loading },
  auth: { isAuthenticated, user },
}) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  return (
    <>
      {isAuthenticated ? (
        user.isAdmin ? (
          <p>Display list of user profiles with different layout</p>
        ) : (
          <Redirect to='/login' />
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

export default connect(mapStateToProps, { getProfiles })(AdminProfiles);

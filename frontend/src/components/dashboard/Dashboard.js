import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import { getCurrentProfile } from '../../actions/profileAction';
import { deleteAccount } from '../../actions/userAction';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user-check'></i> Welcome, {user.firstName}{' '}
        {user.middleName && user.middleName} {user.lastName}!
      </p>
      {profile !== null ? (
        <>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />

          <div className='my-2'>
            <button
              className='btn btn-danger'
              onClick={() => deleteAccount(user._id)}
            >
              <i className='fas fa-user-minus'></i> Delete my account
            </button>
          </div>
        </>
      ) : (
        <>
          <p>I don't see your profile. Do you want to add some info?</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create profile
          </Link>
        </>
      )}
    </>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.authReducer,
  profile: state.profileReducer,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);

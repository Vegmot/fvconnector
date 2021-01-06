import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import UserItem from './UserItem';
import { getUsers } from '../../actions/userAction';
import { getProfiles } from '../../actions/profileAction';

const Users = ({
  getProfiles,
  getUsers,
  user: { users, loading },
  profile: { profiles },
  auth: { isAuthenticated },
}) => {
  useEffect(() => {
    if (isAuthenticated) {
      getUsers();
      getProfiles();
    }
  }, [getProfiles, getUsers, isAuthenticated]);

  return (
    <>
      {isAuthenticated ? (
        loading ? (
          <Spinner />
        ) : (
          <>
            <h1 className='large text-primary'>All Fruit & Veggie lovers</h1>
            <p className='lead'>
              <i className='fas fa-network-wired'></i> Browse and connect with
              others
            </p>
            <div className='profiles'>
              {users.length > 0 ? (
                users.map(user => <UserItem key={user._id} user={user} />)
              ) : (
                <h4>No users found</h4>
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

Users.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.userReducer,
  profile: state.profileReducer,
  auth: state.authReducer,
});

export default connect(mapStateToProps, { getProfiles, getUsers })(Users);

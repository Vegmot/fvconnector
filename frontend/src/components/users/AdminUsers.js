import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alertAction';
import Spinner from '../layout/Spinner';
import formatDate from '../../utils/formatDate';
import { getProfileById, getProfiles } from '../../actions/profileAction';
import { getUsers, adminDeleteAccount } from '../../actions/userAction';

const AdminUsers = ({
  getUsers,
  getProfiles,
  getProfileById,
  adminDeleteAccount,
  user: { users, loading },
  profile: { profile, profiles },
  auth: { isAuthenticated, user: loggedInUser },
}) => {
  useEffect(() => {
    if (loggedInUser.isAdmin) {
      getUsers();
      getProfiles();
    }
  }, [getUsers, getProfiles, loggedInUser]);

  return (
    <>
      <h1>Users</h1>
      {isAuthenticated ? (
        loggedInUser.isAdmin ? (
          loading ? (
            <Spinner />
          ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Member since</th>
                  <th>Has profile</th>
                  <th>Admin</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    <td>
                      {user.firstName} {user.middleName && user.middleName}{' '}
                      {user.lastName}
                    </td>

                    <td>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>

                    <td>{formatDate(user.date)}</td>

                    <td>
                      {profiles.find(profile => profile.user === user._id) ? (
                        <i
                          className='fas fa-check'
                          style={{ color: 'green' }}
                        ></i>
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>

                    <td>
                      {user.isAdmin ? (
                        <i
                          className='fas fa-check'
                          style={{ color: 'green' }}
                        ></i>
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>

                    <td>
                      <LinkContainer
                        to={
                          loggedInUser.isAdmin ? (
                            `/profile/${user._id}`
                          ) : (
                            <>
                              <Redirect to='/dashboard' />
                              {setAlert('Not authorised as admin', 'danger')}
                            </>
                          )
                        }
                      >
                        <button className='btn btn-primary'>
                          <i className='fas fa-info-circle'></i>
                        </button>
                      </LinkContainer>
                    </td>
                    <td>
                      <button
                        className='btn btn-danger'
                        onClick={e => adminDeleteAccount(user._id)}
                      >
                        <i className='fas fa-times'></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )
        ) : (
          <Redirect to='/login' />
        )
      ) : (
        <Redirect to='/login' />
      )}
    </>
  );
};

AdminUsers.propTypes = {
  getUsers: PropTypes.func.isRequired,
  getProfileById: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired,
  adminDeleteAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profileReducer,
  user: state.userReducer,
  auth: state.authReducer,
  admin: state.adminReducer,
});

export default connect(mapStateToProps, {
  getUsers,
  getProfileById,
  getProfiles,
  adminDeleteAccount,
})(AdminUsers);

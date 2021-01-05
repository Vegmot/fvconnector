import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import formatDate from '../../utils/formatDate';
import { adminGetUsers, deleteAccount } from '../../actions/profileAction';

const AdminUsers = ({
  adminGetUsers,
  deleteAccount,
  profile: { profile, profiles, users, loading },
  auth: { isAuthenticated, user: loggedInUser },
}) => {
  useEffect(() => {
    adminGetUsers();
  }, [adminGetUsers]);

  console.log(users);
  console.log(profiles);

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
                            <Redirect to='/login' />
                          )
                        }
                      >
                        <button className='btn btn-primary'>
                          <i className='fas fa-edit'></i>
                        </button>
                      </LinkContainer>
                    </td>
                    <td>
                      <button
                        className='btn btn-danger'
                        onClick={() => deleteAccount()}
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
  adminGetUsers: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profileReducer,
  auth: state.authReducer,
  admin: state.adminReducer,
});

export default connect(mapStateToProps, { adminGetUsers, deleteAccount })(
  AdminUsers
);

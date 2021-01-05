import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/authAction';

const Navbar = ({ auth: { isAuthenticated, user }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/profiles'>
          <i className='fas fa-users'></i>{' '}
          <span className='hide-sm'>FV lovers</span>
        </Link>
      </li>
      <li>
        <Link to='/posts'>
          <i className='far fa-comments'></i>{' '}
          <span className='hide-sm'>Posts</span>
        </Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user-edit'></i>{' '}
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      {user && user.isAdmin && (
        <li>
          <Link to='/admin/users'>
            <i className='fas fa-seedling'></i>{' '}
            <span className='hide-sm'>Manage users</span>
          </Link>
        </li>
      )}
      <li>
        <Link to='/' onClick={logout}>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/profiles'>FV lovers</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-seedling'></i> FVConnector
        </Link>
      </h1>
      <>{isAuthenticated ? authLinks : guestLinks}</>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps, { logout })(Navbar);

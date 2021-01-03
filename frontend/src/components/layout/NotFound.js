import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <h1 className='x-large text-primary'>
        <i className='fas fa-exclamation-triangle'></i> Page not found!
      </h1>
      <p className='large'>
        Unfortunately, the page you were trying to reach does not exist.
      </p>

      <Link to='/landing' clasName='btn btn-primary'>
        Back to landing page
      </Link>
    </>
  );
};

export default NotFound;

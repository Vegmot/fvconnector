import React from 'react';
import PropTypes from 'prop-types';
import formatDate from '../../utils/formatDate';

const ProfileExperience = ({
  experience: { company, title, city, state, current, from, to, description },
}) => (
  <>
    <h3 className='text-primary'>{company}</h3>
    <p>{state && city ? city + ', ' + state : state}</p>
    <p>
      {formatDate(from)} - {to ? formatDate(to) : 'Current'}
    </p>
    <p>
      <strong>Position: </strong> {title}
    </p>
    <p>
      <strong>Description: </strong>
      {description}
    </p>
  </>
);

ProfileExperience.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default ProfileExperience;

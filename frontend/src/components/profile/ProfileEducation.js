import React from 'react';
import PropTypes from 'prop-types';
import formatDate from '../../utils/formatDate';

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, current, from, to, description },
}) => (
  <>
    <h3 className='text-primary'>{school}</h3>
    <p>
      {formatDate(from)} - {to ? formatDate(to) : 'Current'}
    </p>
    <p>
      <strong>Degree: </strong> {degree}
    </p>
    <p>
      <strong>Field of study: </strong> {fieldofstudy}
    </p>
    <p>
      <strong>Description: </strong>
      {description}
    </p>
  </>
);

ProfileEducation.propTypes = {
  education: PropTypes.array.isRequired,
};

export default ProfileEducation;

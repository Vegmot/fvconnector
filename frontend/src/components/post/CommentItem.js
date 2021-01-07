import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/postAction';
import formatDate from '../../utils/formatDate';

const CommentItem = ({
  postId,
  comment: {
    _id: commentId,
    text,
    firstName,
    middleName,
    lastName,
    avatar,
    user,
    date,
  },
  auth,
  user: { users: registeredUsers },
  deleteComment,
}) => {
  return (
    <>
      <div className='post bg-white p-1 my-1'>
        <div>
          <Link to={`/profile/${user}`}>
            <img className='round-img' src={avatar} alt='Profile avatar' />
            <h4>
              {registeredUsers.find(rUser => rUser._id === user) ? (
                middleName ? (
                  firstName + ' ' + middleName + ' ' + lastName
                ) : (
                  firstName + ' ' + lastName
                )
              ) : (
                <span className='deleted-user'>- Deleted user -</span>
              )}
            </h4>
          </Link>
        </div>

        <div>
          <p className='my-1'>{text}</p>
          <p className='post-date'>Posted on {formatDate(date)}</p>

          {!auth.loading && (user === auth.user._id || auth.user.isAdmin) && (
            <button
              onClick={e => deleteComment(postId, commentId)}
              type='button'
              className='btn btn-danger'
            >
              <i className='fas fa-times'></i>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.authReducer,
  user: state.userReducer,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);

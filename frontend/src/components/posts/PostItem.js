import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/postAction';
import formatDate from '../../utils/formatDate';

const PostItem = ({
  post: {
    _id,
    text,
    firstName,
    middleName,
    lastName,
    avatar,
    user,
    likes,
    comments,
    date,
  },
  auth,
  addLike,
  removeLike,
  deletePost,
  showActions,
}) => {
  return (
    <>
      <div className='post bg-white p-1 my-1'>
        <div>
          <Link to={`/profile/${user}`}>
            <img
              className='round-img'
              src={avatar}
              alt={`${firstName}'s profile avatar`}
            />
            <h4>
              {firstName} {middleName && middleName} {lastName}
            </h4>
          </Link>
        </div>
        <div>
          <p className='my-1'>{text}</p>
          <p className='post-date'>Posted on {formatDate(date)}</p>

          {showActions && (
            <>
              <button
                type='button'
                className='btn btn-light'
                onClick={() => addLike(_id)}
              >
                <i className='fas fa-thumbs-up'></i>{' '}
                <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
              </button>

              <button
                type='button'
                className='btn btn-light'
                onClick={() => removeLike(_id)}
              >
                <i className='fas fa-thumbs-down'></i>
              </button>

              <Link to={`/posts/${_id}`} className='btn btn-primary'>
                Comments{' '}
                {comments.length > 0 && (
                  <span className='comment-count'>{comments.length}</span>
                )}
              </Link>

              {!auth.loading && user === auth.user._id && (
                <button
                  type='button'
                  className='btn btn-danger'
                  onClick={e => deletePost(_id)}
                >
                  <i className='fas fa-times'></i>
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
};

const mapStateToProps = state => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);

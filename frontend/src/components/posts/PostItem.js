import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  addLike,
  removeLike,
  addDislike,
  removeDislike,
  deletePost,
} from '../../actions/postAction';

import formatDate from '../../utils/formatDate';

const PostItem = ({
  addLike,
  removeLike,
  addDislike,
  removeDislike,
  deletePost,
  auth,
  user: { users: registeredUsers },
  post: {
    _id: postId,
    text,
    firstName,
    middleName,
    lastName,
    avatar,
    user,
    likes,
    dislikes,
    comments,
    date,
  },
  showActions,
}) => {
  const likeUsers = [];
  const dislikeUsers = [];

  function getLikeUsers() {
    likes.map(like => {
      registeredUsers.map(rUser => {
        if (rUser._id === like.user) {
          likeUsers.push(rUser.firstName);
        }
      });
    });
  }

  function getDislikeUsers() {
    dislikes.map(dislike => {
      registeredUsers.map(rUser => {
        if (rUser._id === dislike.user) {
          dislikeUsers.push(rUser.firstName);
        }
      });
    });
  }

  getLikeUsers();
  getDislikeUsers();

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
                <span className='deleted-user'>&#40;Deleted user&#41;</span>
              )}
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
                className={`btn ${
                  likes.find(like => like.user === auth.user._id)
                    ? 'btn-primary'
                    : 'btn-light'
                }`}
                onClick={() => {
                  if (likes.find(like => like.user === auth.user._id)) {
                    removeLike(postId);
                  } else {
                    if (
                      !dislikes.find(dislike => dislike.user === auth.user._id)
                    ) {
                      addLike(postId);
                    }
                  }
                }}
              >
                <i className='fas fa-thumbs-up'></i>{' '}
                <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
              </button>

              <button
                type='button'
                className={`btn ${
                  dislikes.find(dislike => dislike.user === auth.user._id)
                    ? 'btn-danger'
                    : 'btn-light'
                }`}
                onClick={() => {
                  if (
                    dislikes.find(dislike => dislike.user === auth.user._id)
                  ) {
                    removeDislike(postId);
                  } else {
                    if (!likes.find(like => like.user === auth.user._id)) {
                      addDislike(postId);
                    }
                  }
                }}
              >
                <i className='fas fa-thumbs-down'></i>{' '}
                <span>
                  {dislikes.length > 0 && <span>{dislikes.length}</span>}
                </span>
              </button>

              <Link to={`/posts/${postId}`} className='btn btn-primary'>
                Comments{' '}
                {comments.length > 0 && (
                  <span className='comment-count'>{comments.length}</span>
                )}
              </Link>

              {!auth.loading && (user === auth.user._id || auth.user.isAdmin) && (
                <button
                  type='button'
                  className='btn btn-danger'
                  onClick={e => deletePost(postId)}
                >
                  <i className='fas fa-times'></i>
                </button>
              )}

              <div className='likeUsers'>
                <small>
                  {likes.length > 0
                    ? likes.length === 1
                      ? likeUsers.join(', ') + ' likes this post.'
                      : likeUsers.join(', ') + ' like this post.'
                    : ''}
                </small>
              </div>

              <div className='dislikeUsers'>
                <small>
                  {dislikes.length > 0
                    ? dislikes.length === 1
                      ? dislikeUsers.join(', ') + ' dislikes this post.'
                      : dislikeUsers.join(', ') + ' dislike this post.'
                    : ''}
                </small>
              </div>
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
  user: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  addDislike: PropTypes.func.isRequired,
  removeDislike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
};

const mapStateToProps = state => ({
  auth: state.authReducer,
  user: state.userReducer,
});

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  addDislike,
  removeDislike,
  deletePost,
})(PostItem);

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
  /*
@ todo list
what I am trying to achieve: display the names of users who like/dislike the post.
example: {firstName}, {firstName} like this post. / {firstName} dislikes this post.
if a post has more than 4 (dis)likes, it has to display differently: {firstName}, {firstName} and {numRest} others like this post.

1: reach User model using users' id in likes array(like => like.user) by also using the ref 'users'
2: get the firstName(s) that correspond to each id
3: I should finally return the firstNames of _ids in likes array.
*/
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

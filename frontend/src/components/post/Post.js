import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import { getAPost } from '../../actions/postAction';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem.js';

const Post = ({ getAPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getAPost(match.params.id);
  }, [getAPost, match]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <>
      <Link to='/posts' className='btn'>
        Back to posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      <div className='comments'>
        {post.comments.map(com => (
          <CommentItem key={com._id} comment={com} postId={post._id} />
        ))}
      </div>
    </>
  );
};

Post.propTypes = {
  getAPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  post: state.postReducer,
});

export default connect(mapStateToProps, { getAPost })(Post);

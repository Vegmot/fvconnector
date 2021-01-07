import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPosts } from '../../actions/postAction';
import { getUsers } from '../../actions/userAction';

const Posts = ({ getUsers, getPosts, post: { loading, posts } }) => {
  useEffect(() => {
    getUsers();
    getPosts();
  }, [getUsers, getPosts]);

  return loading ? (
    <Spinner />
  ) : (
    <>
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user-check'></i> Welcome to the community!
      </p>
      <PostForm />
      <div className='posts'>
        {posts.map(post => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </>
  );
};

Posts.propTypes = {
  getUsers: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  post: state.postReducer,
  user: state.userReducer,
});

export default connect(mapStateToProps, { getUsers, getPosts })(Posts);

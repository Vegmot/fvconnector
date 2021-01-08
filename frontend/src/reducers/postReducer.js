import {
  GET_POST,
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  UPDATE_DISLIKES,
  DELETE_POST,
  ADD_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  users: [],
  loading: true,
  error: {},
};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };

    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false,
      };

    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts], // here, action.payload is a newly created post
        loading: false,
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload), // in postAction, action.payload returns postId and that's why it is compared with each post._id in posts array
        loading: false,
      };

    case POST_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload.id
            ? { ...post, likes: action.payload.likes }
            : post
        ),
        loading: false,
      };

    case UPDATE_DISLIKES:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload.id
            ? { ...post, dislikes: action.payload.dislikes }
            : post
        ),
      };

    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: action.payload },
        loading: false,
      };

    case DELETE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(co => co._id !== action.payload),
        },
        loading: false,
      };

    default:
      return state;
  }
}

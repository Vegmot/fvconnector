import {
  GET_USER,
  GET_USERS,
  USERS_ERROR,
  CLEAR_USERS,
} from '../actions/types';

const initialState = {
  user: {},
  users: [],
  loading: true,
  error: {},
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };

    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };

    case USERS_ERROR:
      return {
        ...state,
        user: null,
        loading: false,
        error: action.payload,
      };

    case CLEAR_USERS:
      return {
        ...state,
        user: null,
        loading: false,
      };

    default:
      return state;
  }
}

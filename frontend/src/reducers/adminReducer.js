import {
  ADMIN_GET_USERS,
  ADMIN_GET_PROFILES,
  ADMIN_USERS_ERROR,
  ADMIN_PROFILES_ERROR,
} from '../actions/types';

const initialState = {
  profiles: [],
  users: [],
  loading: true,
  error: {},
};

export default function adminReducer(state = initialState, action) {
  switch (action.type) {
    case ADMIN_GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };

    case ADMIN_GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false,
      };

    case ADMIN_USERS_ERROR:
      return {
        ...state,
        users: null,
        loading: false,
        error: action.payload,
      };

    case ADMIN_PROFILES_ERROR:
      return {
        ...state,
        profiles: null,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

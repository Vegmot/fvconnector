import {
  GET_PROFILE,
  GET_PROFILES,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  PROFILE_ERROR,
  ADMIN_GET_PROFILES,
  ADMIN_GET_USERS,
  ADMIN_PROFILES_ERROR,
  ADMIN_USERS_ERROR,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  users: [],
  loading: true,
  error: {},
};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };

    case GET_PROFILES:
    case ADMIN_GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false,
      };

    case ADMIN_GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };

    case PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        profile: null,
      };

    case ADMIN_PROFILES_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        profiles: [],
      };

    case ADMIN_USERS_ERROR:
      return {
        ...state,
        error: action.payload,
        users: [],
        loading: false,
      };

    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
      };

    default:
      return state;
  }
}

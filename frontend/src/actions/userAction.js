import axios from 'axios';
import { setAlert } from './alertAction';
import {
  GET_USER,
  GET_USERS,
  USERS_ERROR,
  CLEAR_USERS,
  DELETE_ACCOUNT,
} from './types';

// get all users / admin
export const getUsers = () => async dispatch => {
  dispatch({ type: CLEAR_USERS });

  try {
    const res = await axios.get('/api/users');

    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: USERS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//get a user by id
export const getUserById = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/user/${userId}`);

    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: USERS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// delete account & profile
export const deleteAccount = userId => async dispatch => {
  if (window.confirm('Are you sure? This cannot be undone.')) {
    try {
      await axios.delete(`/api/profile/user/${userId}`);

      dispatch({ type: CLEAR_USERS });
      dispatch({ type: DELETE_ACCOUNT });

      dispatch(setAlert('Deleted account', 'success'));
    } catch (error) {
      dispatch({
        type: USERS_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  }
};

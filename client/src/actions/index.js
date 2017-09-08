import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  // the dispatch function will automatically forward all the actions passed in to the different reducers
  // AFTER the get current user api request has been completed
  dispatch({ type: FETCH_USER, payload: res.data });
};

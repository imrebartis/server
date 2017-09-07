import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => {
  // the dispatch function will automatically forward all the actions passed in to the different reducers
  // AFTER the get current user api request has been completed
  return function(dispatch) {
    axios
      // the route is same as in the auth handler in authRoutes.js
      .get('/api/current_user')
      .then(res => dispatch({ type: FETCH_USER, payload: res }));
  };
};

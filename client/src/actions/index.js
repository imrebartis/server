import axios from 'axios';
import { FETCH_USER } from './types';

const fetchUser = () => {
  // the route is same as in the auth handler in authRoutes.js
  axios.get('/api/current_user');
};

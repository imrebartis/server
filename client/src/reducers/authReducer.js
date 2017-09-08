import { FETCH_USER } from '../actions/types';

// state = null means by default we don't know if user is logged in or not
export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      // return the user model or false (i.e. not logged in)
      return action.payload || false;
    default:
      return state;
  }
}

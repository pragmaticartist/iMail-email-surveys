import { FETCH_USER, RECEIVE_USER } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      console.log(action.type);
      return state;
    case RECEIVE_USER:
      console.log(action.type);
      return action.payload || false;
    default:
      return state;
  }
}

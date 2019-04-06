import { RECEIVE_SURVEYS } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case RECEIVE_SURVEYS:
      return action.payload || [];
    default:
      return state;
  }
}

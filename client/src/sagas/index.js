import { all, takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_USER,
  RECEIVE_USER,
  HANDLE_STRIPE_TOKEN,
} from '../actions/types';

export function* fetchUser() {
  const res = yield axios.get('/api/current_user');
  yield put({ type: RECEIVE_USER, payload: res.data });
}

// FETCH_USER is an action being dispatch()ed, fetchUser is the 'worker' function called
export function* watchFetchUser() {
  yield takeEvery(FETCH_USER, fetchUser);
}

export function* handleStripeToken(action) {
  const res = yield axios.post('/api/stripe', action.payload);
  yield put({ type: RECEIVE_USER, payload: res.data });
}

export function* watchHandleStripeToken() {
  yield takeEvery(HANDLE_STRIPE_TOKEN, handleStripeToken);
}

export default function* rootSaga() {
  yield all([watchFetchUser(), watchHandleStripeToken()]);
}

import { FETCH_USER, HANDLE_STRIPE_TOKEN } from './types';

export const fetchUserAction = () => {
  return { type: FETCH_USER };
};

export const handleTokenAction = token => {
  return { type: HANDLE_STRIPE_TOKEN, payload: token };
};

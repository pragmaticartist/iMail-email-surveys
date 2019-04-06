import {
  FETCH_USER,
  HANDLE_STRIPE_TOKEN,
  SUBMIT_SURVEY,
  FETCH_SURVEYS,
} from './types';

export const fetchUserAction = () => {
  return { type: FETCH_USER };
};

export const handleTokenAction = token => {
  return { type: HANDLE_STRIPE_TOKEN, payload: token };
};

export const submitSurveyAction = (formValues, history) => {
  return { type: SUBMIT_SURVEY, payload: { formValues, history } };
};

export const fetchSurveysAction = () => {
  return { type: FETCH_SURVEYS };
};

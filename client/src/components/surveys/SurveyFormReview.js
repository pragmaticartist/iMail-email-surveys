import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import formFields from './formFields';
import { submitSurveyAction } from '../../actions';

const SurveyFormReview = ({
  onCancel,
  formValues,
  submitSurveyAction,
  history,
}) => {
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your changes.</h5>
      {reviewFields}
      <button className='yellow darken-3 btn-flat' onClick={onCancel}>
        Back
      </button>
      <button
        className='green white-text btn-flat right'
        onClick={() => submitSurveyAction(formValues, history)}
      >
        Send Survey
        <i className='material-icons right'>email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      submitSurveyAction,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SurveyFormReview));

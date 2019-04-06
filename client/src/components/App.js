// react router stuff
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { fetchUserAction } from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

class App extends Component {
  componentDidMount = () => {
    this.props.fetchUserAction();
  };

  render() {
    return (
      <BrowserRouter>
        <div className='container'>
          <Header />
          <Route exact path='/' component={Landing} />
          <Route exact path='/surveys' component={Dashboard} />
          <Route path='/surveys/new' component={SurveyNew} />
        </div>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchUserAction,
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(App);

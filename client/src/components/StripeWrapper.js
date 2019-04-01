import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { handleTokenAction } from '../actions/index';

class StripeWrapper extends Component {
  render() {
    return (
      <StripeCheckout
        name='iMail'
        description='$5 for 5 email credits'
        amount={500}
        token={token => this.props.handleStripeToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className='btn'>Add Credits</button>
      </StripeCheckout>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      handleStripeToken: handleTokenAction,
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(StripeWrapper);

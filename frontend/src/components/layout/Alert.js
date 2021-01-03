import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
  alerts.map(alert => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  // state.{name}: {name} is already defined in combineReducers in store.js
  // quite similar to what I already have in fruitables
  // the layout is quite different but actually it's doing the same thing
  alerts: state.alertReducer,
});

export default connect(mapStateToProps)(Alert);

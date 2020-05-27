import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
class Alert extends Component {
  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    if (prevProps.message !== message) {
      if (message.productAdded) alert.success(message.productAdded);
      if (message.userLoaded) alert.show(message.userLoaded);
      if (message.logoutSuccess) alert.show(message.logoutSuccess);
      if (message.itemRemoved) alert.info(message.itemRemoved);
      if (message.passwordMismatch) alert.error(message.passwordMismatch);
      if (message.registerSuccess) alert.success(message.registerSuccess);
    }

    if (prevProps.error !== error) {
      if (error.msg.detail) alert.error(error.msg.detail);
      if (error.msg.non_field_errors)
        alert.error(error.msg.non_field_errors.join());
    }
  }
  render() {
    return <Fragment />;
  }
}

const mapStateToProps = (state) => ({
  error: state.error,
  message: state.message,
});
export default connect(mapStateToProps)(withAlert()(Alert));

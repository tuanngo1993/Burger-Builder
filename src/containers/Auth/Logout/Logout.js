import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import * as actions from "../../../store/actions/index";

const mapDispatchToProps = dispatch => {
  return {
    handleLogout: () => dispatch(actions.logout())
  };
};

export const Logout = connect(null, mapDispatchToProps)(props => {
  React.useEffect(() => {
    props.handleLogout();
  }, []);

  return <Redirect to="/" />;
});
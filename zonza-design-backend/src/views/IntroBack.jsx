import React from "react";
import { connect } from "react-redux";

const Dashboard = ({ sidebarTheme, layoutTheme }) => {
  return (

    <>
      <h1>Coming Soon</h1>
    </>
  );
};

const mapStateToProps = state => {
  return {
    ...state.themeChanger
  };
};

// export default connect(null, null)(Dashboard);
export default connect(mapStateToProps, null)(Dashboard);

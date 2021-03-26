import React from "react";
import logoutfunc from "../../components/SessionDelete/index.js"

class Logout extends React.Component {
  render() {
    return (
      <>
      {
        logoutfunc()
      }
      </>
    );
  }
}

export default Logout;

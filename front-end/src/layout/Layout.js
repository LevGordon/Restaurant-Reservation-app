import React from "react";
import Menu from "./Menu";
import Routes from "./Routes";

// npm cache clean --force
/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Layout() {
  return (
    <div className="container-fluid" id='main-container'>
      <div>
        <div>
          <Menu />
        </div>
        <div>
          <Routes />
        </div>
      </div>
    </div>
  );
}

export default Layout;

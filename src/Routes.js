import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./pages/Main/Main";

const Routes = () => {
  return (
    <Router>
      <Route path="/" component={Main} />
    </Router>
  );
};

export default Routes;

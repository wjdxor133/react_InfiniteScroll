import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Scroll from "./pages/Scroll/Scroll";

const Routes = () => {
  return (
    <Router>
      <Route path="/" component={Scroll} />
    </Router>
  );
};

export default Routes;

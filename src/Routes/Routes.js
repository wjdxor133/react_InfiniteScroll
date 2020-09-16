import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import InfiniteScroll from "../pages/InfiniteScroll/InfiniteScroll";

const Routes = () => {
  return (
    <Router>
      <Route path="/" component={InfiniteScroll} />
    </Router>
  );
};

export default Routes;

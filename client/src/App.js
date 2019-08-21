import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";
import NavTabs from "./components/NavTabs";
import Saved from "./components/pages/Saved";
import Search from "./components/pages/Search";
import MixTapeHome from "./components/pages/MixTapeHome";

function App() {
  return (
    <Router>
      <div>
        <NavTabs />
        <Route exact path="/" component={MixTapeHome} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/saved" component={Saved} />
      </div>
    </Router>
  );
}

export default App;

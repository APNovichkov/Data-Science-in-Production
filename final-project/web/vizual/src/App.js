import React from "react";
import logo from "./logo.svg";
import "./App.css";

// Import router
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

// Import components
import Navbar from "./components/navbar";

// Import pages
import HomePage from "./pages/homePage";
import DatasetPage from "./pages/datasetPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="body-wrapper">
          <Switch>
            <Route path="/" exact component={DatasetPage}></Route>
            <Route path="/dataset" component={DatasetPage}></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;

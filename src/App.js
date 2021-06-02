import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Temperature from "./components/temperature";
import Home from "./components/Home";
import SignIn from "./components/SignIn";

export default function App() {
  const token = localStorage.getItem("token");
  if(!token) {
    return <SignIn />
  }
  return (
    <Router>
      <Switch>
        <Route path="/DHT11">
          <Temperature />
        </Route>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/">
          <SignIn />
        </Route>
      </Switch>
    </Router>
  );
}

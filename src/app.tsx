import "./app.css"
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom"

import Home from "./pages/home"
import About from "./pages/about"

const App = () => {
  return(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      {console.log(process.env.PUBLIC_URL)}
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/about" exact component={About} />
    </Switch>
    </BrowserRouter>
  )
}

ReactDOM.render(<App />, document.getElementById("app"));
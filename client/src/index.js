import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import ReactDOM from "react-dom";
import "./index.css";
import Homepage from "./containers/homepage";
import SignIn from "./containers/login";
import PageNotFound from "./containers/PageNotFound";

// Codigo de colores de la app:
/* 
   Blanco     E5D8D1 
   Azul claro 5B88C6
   Morado     4B2B95
   Purpura    56579F
   Azul Dark  0C0F2A
*/

ReactDOM.render(
  <>
    <Router>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/access/:login" component={SignIn} />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  </>,
  document.getElementById("root")
);

import React, { useContext } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Homepage from "./containers/homepage";
import SignIn from "./containers/login";
import PageNotFound from "./containers/PageNotFound";
import Chat from "./containers/chat/Chat"
import { AuthContext, AuthContextProvider } from "./context/AuthContext";
import AppSettings from './containers/appSettings';
// Codigo de colores de la app:
/* 
   Blanco     E5D8D1 
   Azul claro 5B88C6
   Morado     4B2B95
   Purpura    56579F
   Azul Dark  0C0F2A
*/

function App() {
  return (
  <div>
    <AuthContextProvider>
    <Router>
      <Switch>
        <Route exact path="/chat" component={Chat}/>
        <Route exact path="/settings" component={AppSettings}/>
        <Route exact path="/access/:login" component={SignIn}/> 
        <Route exact path="/" component={Homepage}/>
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  </AuthContextProvider>  
  </div>
  )
}

export default App;

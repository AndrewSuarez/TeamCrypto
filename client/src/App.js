import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import Homepage from './containers/homepage';
import SignIn from './containers/login';
import ResetPassword from './containers/ResetPassword';
import PageNotFound from './containers/PageNotFound';
import Verificate2FA from './containers/2faVerification';
import Chat from './containers/chat/Chat';
import { AuthContext, AuthContextProvider } from './context/AuthContext';
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
            <Route exact path='/chat' component={Chat} />
            <Route exact path='/settings' component={AppSettings} />
            <Route exact path='/access/:login' component={SignIn} />
            <Route
              exact
              path='/reset-password/:token'
              component={ResetPassword}
            />
            <Route exact path='/2fa-verification' component={Verificate2FA} />
            <Route exact path='/activate-2fa' component={Verificate2FA} />
            <Route exact path='/' component={Homepage} />
            <Route component={PageNotFound} />
          </Switch>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;

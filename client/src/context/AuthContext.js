import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import Session from 'react-session-api';

const INITIAL_STATE = {
    user:  null,
    error: false,
}

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)
    Session.set('usuario', state.user)

    return(
        <AuthContext.Provider value={{
            user:  state.user,
            error:state.error,
            dispatch
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}
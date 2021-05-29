import React, { createContext, useReducer } from 'react';
import {authReducer} from './AuthReducer';

export const AuthContext = createContext();
export const AuthContextProvider = (props) => {
    const [authState,authDispatch] = useReducer(authReducer,{
        isLoading:true,
        errMess:null,
        auth:{},
        isFormOpen: false   // boolean to open the signin/signup modal
    });
    return ( 
        <AuthContext.Provider value={{authState,authDispatch}}>
            {props.children}
        </AuthContext.Provider>
    );
}
export default AuthContextProvider;
// const AuthContextConsumer = AuthContext.Consumer;
// export default AuthContextConsumer;
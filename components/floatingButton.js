import {useContext, useEffect} from 'react';
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import { AuthContext } from '../Context/AuthContext';
import * as AuthActionCreators from '../Context/AuthActionCreater';
import storageService from '../lib/localStorageHelpers';
const FloatingButton = () => {
    const {authState, authDispatch} = useContext(AuthContext);
    useEffect(()=>{
        if(!authState.auth.token){
            const auth = storageService.loadUser();
            if(auth) authDispatch(AuthActionCreators.authStateUpdate(auth));
        }
    },[authState])
    return ( 
        <div>  
            <Fab
                // mainButtonStyles={mainButtonStyles}
                // actionButtonStyles={actionButtonStyles}
                // style={style}
                icon={<i className="fa fa-plus"></i>}
                // event={event}
                alwaysShowTitle={true}
                // onClick={someFunctionForTheMainButton}
            >
            {authState.auth.token?
                <Action data-toggle="tooltip" data-placement="right" title="Signout"
                    text="Signout"
                    onClick={()=>{
                        authDispatch(AuthActionCreators.authStateUpdate({}));
                        storageService.logoutUser();
                    }}
                >
                    <i className="fa fa-sign-out"></i>
                </Action>
            :
                <Action data-toggle="tooltip" data-placement="right" title="Signin"
                    text="Singin"
                    onClick={()=>authDispatch(AuthActionCreators.authStateForm())}
                >
                    <i className="fa fa-sign-in"></i>
                </Action>
            }
            
            <Action data-toggle="tooltip" data-placement="left" title="About"
                text="About"
                // onClick={handleHelpOnClick}
            >
                <i className="fa fa-info" />
            </Action>            
            </Fab>
        </div>
     );
}
 
export default FloatingButton;
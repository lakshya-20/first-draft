import {useContext, useEffect} from 'react';
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import { AuthContext } from '@/Context/AuthContext';
import * as AuthActionCreators from '@/Context/AuthActionCreater';
import storageService from '@/lib/localStorageHelpers';
import { useRouter } from "next/router";
const FloatingButton = () => {
    const {authState, authDispatch} = useContext(AuthContext);
    const router = useRouter()
    const isHome = router.pathname=="/"?true:false;
    useEffect(()=>{
        if(!authState.auth.token){
            const auth = storageService.loadUser();
            if(auth) authDispatch(AuthActionCreators.authStateUpdate(auth));
        }
    },[authState])
    return ( 
        <div>  
            {/* {console.log({router})} */}
            <Fab
                // mainButtonStyles={mainButtonStyles}
                // actionButtonStyles={actionButtonStyles}
                style={{ bottom: 5, right: 5 }}
                icon={<i className="fa fa-plus"></i>}
                event="click"
                alwaysShowTitle={true}
                // onClick={someFunctionForTheMainButton}
            >
            {!isHome?
                <Action data-toggle="tooltip" data-placement="left" title="Home"
                    text="Home"
                    onClick={()=>router.push("/")}
                >
                    <i className="fa fa-home" />
                </Action>
            :
                null
            }
            {/* <Action data-toggle="tooltip" data-placement="left" title="About"
                text="About"
                // onClick={handleHelpOnClick}
            >
                <i className="fa fa-info" />
            </Action> */}
            {/* {authState.auth.token?
                <Action data-toggle="tooltip" data-placement="right" title="New"
                    text="New"
                    onClick={()=>router.push(`/blogs/new`)}
                >
                    <i className="fa fa-plus"></i>
                </Action>
            :
                null
            } */}
            <Action data-toggle="tooltip" data-placement="right" title="New"
                text="New"
                onClick={()=>{
                    if(authState.auth.token){
                        router.push(`/blogs/form?id=new`)
                    }
                    else{
                        authDispatch(AuthActionCreators.authStateForm())
                    }
                }}
            >
                <i className="fa fa-plus"></i>
            </Action>
            {authState.auth.token?
                <Action data-toggle="tooltip" data-placement="right" title="Profile"
                    text="Profile"
                    onClick={()=>router.push(`/profile/${authState.auth.user._id}`)}
                >
                    <i className="fa fa-user"></i>
                </Action>
            :
                null
            }
            {authState.auth.token?
                <Action data-toggle="tooltip" data-placement="right" title="Signout"
                    text="Signout"
                    onClick={()=>{
                        authDispatch(AuthActionCreators.authStateUpdate({}));
                        storageService.logoutUser();
                        router.push("/");
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
            </Fab>
        </div>
     );
}
 
export default FloatingButton;
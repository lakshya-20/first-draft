import {useContext, useState, useEffect} from 'react';
import Head from "next/head";
import FloatingButton from "../components/floatingButton";
import { AuthContext } from '../Context/AuthContext';
import AuthForm from "./auth";
import { useRouter } from 'next/router'
const Layout = ({children, home}) => {
    const {authState} = useContext(AuthContext);
    const [isFloatingButtonOpen, setIsFloatingButtonOpen] = useState(true);
    const router = useRouter();
    useEffect(()=>{
        setIsFloatingButtonOpen(!authState.isFormOpen);
    },[authState])
    return(
        <div className="m-2">
            <AuthForm/>
            {isFloatingButtonOpen?
                <FloatingButton/>
            :   
                ""
            }
            
            <div className="container">
                {children}        
                {!home? 
                    <div onClick={()=>router.back()}>← Back</div>
                :
                    null
                }
            </div>
        </div>
    )
}
 
export default Layout;
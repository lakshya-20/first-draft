import {useContext, useState, useEffect} from 'react';
import Head from "next/head";
import FloatingButton from "../components/floatingButton";
import { AuthContext } from '../Context/AuthContext';
import AuthForm from "./auth";
const Layout = ({children, home}) => {
    const {authState} = useContext(AuthContext);
    const [isFloatingButtonOpen, setIsFloatingButtonOpen] = useState(true);
    useEffect(()=>{
        setIsFloatingButtonOpen(!authState.isFormOpen);
    },[authState])
    return(
        <div>
            <AuthForm/>
            {isFloatingButtonOpen?
                <FloatingButton/>
            :   
                ""
            }
            
            <div>
                {children}        
            </div>
        </div>
    )
}
 
export default Layout;
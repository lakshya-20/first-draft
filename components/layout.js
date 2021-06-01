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
    const renderBackButton = () =>{
        if(!home) {
            if (typeof window !== 'undefined') {
                if(window.history.length > 2){
                    return(
                        <div onClick={()=>{router.back()}}>← Back</div>
                    )
                }
                else {
                    return(
                        <div onClick={()=>{router.push('/')}}>← Back</div>
                    )                    
                }
            }
        }
        else{
            return(null)
        }
    }
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
                {renderBackButton()}
            </div>
        </div>
    )
}
 
export default Layout;
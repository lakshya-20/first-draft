import {useContext, useState, useEffect} from 'react';
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
                        <span onClick={()=>{router.back()}} type="button">← Back</span>
                    )
                }
                else {
                    return(
                        <span onClick={()=>{router.push('/')}} type="button">← Back</span>
                    )                    
                }
            }
        }
        else{
            return(null)
        }
    }
    return(
        <div>
            
            <AuthForm/>
            {isFloatingButtonOpen?
                <FloatingButton/>
            :   
                ""
            }
            
            {home?
                <div>
                    {children}
                </div>
            :
                <div className="container">
                    {children} 
                    {renderBackButton()}
                </div>
            }
        </div>
    )
}
 
export default Layout;
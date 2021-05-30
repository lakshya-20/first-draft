import {useContext} from 'react';
import Layout from "../components/layout"
import { AuthContext } from '../Context/AuthContext';
const HomePage = () =>{
    const {authState} = useContext(AuthContext);
    return (
        <div>
                       
        </div>
    )
}
export default HomePage;

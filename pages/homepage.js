import {useContext} from 'react';
import Layout from "../components/layout"
import { AuthContext } from '../Context/AuthContext';
const HomePage = () =>{
    const {authState} = useContext(AuthContext);
    return (
        <div>
            <Layout>
                
            </Layout>            
        </div>
    )
}
export default HomePage;

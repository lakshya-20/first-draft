import {useContext} from 'react';
import Head from 'next/head'
import { AuthContext } from '../Context/AuthContext';
import * as AuthActionCreators from '../Context/AuthActionCreater';
import Layout from '../components/layout';
export default function Home() {    
    const {authState, authDispatch} = useContext(AuthContext);
    // if(!authState.auth.token){
    //     const auth = storageService.loadUser();
    //     if(auth) authDispatch(AuthActionCreators.authStateUpdate(auth));
    // }
    return (
        <div className="">            
            {/* <AuthForm/>
            <Head>
              <title>First Draft</title>
              <meta name="description" content="A blog site made using Next.js." />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="">
                <HomePage/>
            </main>                        
            <footer className="">
                <Footer/>
            </footer>
            <div className="">
                <FloatingButton/>   
            </div> */}
            <Layout>
                <Head>
                    <title>First Draft</title>
                </Head>
                <section>
                    {JSON.stringify(authState)}
                </section>
            </Layout>
        </div>
    )
}

import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import AuthContextProvider from '@/Context/AuthContext';
function MyApp({ Component, pageProps }) {
    return  (
        <AuthContextProvider>
            <Component {...pageProps} />
        </AuthContextProvider>
    )
}

export default MyApp

const Layout = ({children, home}) => {
    return ( 
        <div>
            <header></header>
            <main>
                {children}
            </main>
        </div>
     );
}
 
export default Layout;
import Layout from "../../components/layout"

const Profile = () => {
    return ( 
        <div>
            <Layout>
                Profile Page
            </Layout>
        </div>
     );
}
 
export default Profile;

// export async function getServerSideProps(context){
//     const {query: {id}} = context;
//     return {
//         params: {}
//     }
// }
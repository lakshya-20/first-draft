import Layout from "../../components/layout"
import Head from 'next/head';
import Image from 'next/image'
import {getProfileData} from '../../lib/profile';
import RenderBlogCard from '../../components/RenderBlogCard';
import {Row} from 'reactstrap';
const Profile = ({profile}) => {
    return ( 
        <div>
            <Layout>
                <Head>
                    <title>{profile.name}</title>
                </Head>
                <header className="text-center d-flex justify-content-around align-items-center">
                    <div>
                        <Image
                            priority
                            src= {profile.dp}
                            height={144}
                            width={144}
                            alt={profile.name}
                            className="user_dp"
                        />
                    </div>
                    <div>
                        <span>
                            <h3>{profile.name}</h3>    
                            <h5>Total Blogs {profile.blogs.length}</h5>
                        </span>
                    </div>
                </header>
                <section>
                    <Row>
                        {profile.blogs.map(blog => {
                            return(<RenderBlogCard blog={blog} key={blog._id}/>)
                        })}
                    </Row>
                </section>
            </Layout>
        </div>
     );
}
 
export default Profile;

export async function getServerSideProps(context){
    const {query: {id}} = context;
    const profile  = await getProfileData(id);
    return {
        props: {profile}
    }
}
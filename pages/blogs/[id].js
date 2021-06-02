import Layout from "../../components/layout";
import Head from 'next/head';
import Image from 'next/image'
import Link from 'next/link';
import {getBlogData} from '../../lib/blog';
import DateString from "../../components/date";
const Blog = ({blog}) => {
    return ( 
        <div>
            <Layout>
                <Head>
                    <title>{blog.title}</title>
                </Head>
                <header className="text-center">
                    <Image
                        priority
                        src= {blog.postedBy.dp}
                        height={100}
                        width={100}
                        alt={blog.postedBy.name}
                        className="user_dp"
                    />     
                    <Link href={`/profile/${blog.postedBy._id}`}>
                        <h4>{blog.postedBy.name}</h4>                        
                    </Link>                                   
                </header>
                <article>
                    <h1>{blog.title}</h1>
                    <div>
                        <DateString dateString={blog.createdAt}/>
                    </div>
                    <div>
                        <h5>{blog.description}</h5>
                    </div>                    
                    <div dangerouslySetInnerHTML={{ __html:blog.markdown }} />
                </article>
            </Layout>            
        </div>
    );
}
 
export default Blog;

export async function getServerSideProps(context) {
    const {query: {id}} = context
    const blog = await getBlogData(id);
    return {props: {blog}}
}
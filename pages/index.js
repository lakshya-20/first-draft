import {useContext, useState, useEffect} from 'react';
import Head from 'next/head'
import { AuthContext } from '../Context/AuthContext';
import Layout from '../components/layout';
import {getSortedBlogsData} from '../lib/blog';
import {Row} from 'reactstrap';
import RenderBlogCard from '../components/RenderBlogCard';

export default function Home() {    
    const {authState} = useContext(AuthContext);
    const [blogs,setBlogs] = useState([]);
    useEffect( async ()=>{
        const blogs = await getSortedBlogsData();
        setBlogs(blogs);
    },[])

    return (
        <div className="">
            <Layout home>
                <Head>
                    <title>First Draft</title>
                </Head>
                <section>
                    {authState.auth.token?
                        <div>
                            Welcome {authState.auth.user.name}
                        </div>
                    :
                        ""
                    }
                </section>
                <section>
                    <Row>
                        {blogs.map(blog => {
                            return(<RenderBlogCard blog={blog} key={blog._id}/>)
                        })}
                    </Row>
                </section>
            </Layout>
        </div>
    )
}

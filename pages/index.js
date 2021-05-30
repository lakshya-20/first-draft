import {useContext, useState, useEffect} from 'react';
import Head from 'next/head'
import { AuthContext } from '../Context/AuthContext';
import Layout from '../components/layout';
import {getSortedBlogsData} from '../lib/blog';
import Link from 'next/link'
import {Card, CardTitle, CardText, Row, Col} from 'reactstrap';

export default function Home() {    
    const {authState} = useContext(AuthContext);
    const [blogs,setBlogs] = useState([]);
    useEffect( async ()=>{
        const blogs = await getSortedBlogsData();
        setBlogs(blogs);
    },[])

    const renderBlog = (blog) =>{
        return(
            <Col sm="12" key={blog._id}>
                <Card body>
                    <Link href={`/blogs/${blog._id}`}>
                        <CardTitle tag="h5">{blog.title}</CardTitle>
                    </Link>
                    <CardText>{blog.description}</CardText>
                </Card>
            </Col>
        )
    }

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
                            return(renderBlog(blog))
                        })}
                    </Row>
                </section>
            </Layout>
        </div>
    )
}

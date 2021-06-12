import {useContext, useState, useEffect} from 'react';
import Head from 'next/head'
import { AuthContext } from '@/Context/AuthContext';
import Layout from '@/components/Layout';
import {getSortedBlogsData} from '@/lib/blog';
import {Row} from 'reactstrap';
import RenderBlogCard from '@/components/RenderBlogCard';
import * as AuthActionCreators from '@/Context/AuthActionCreater';
import styles from '/styles/index.module.css';
export default function Home() {    
    const {authState, authDispatch} = useContext(AuthContext);
    const [blogs,setBlogs] = useState([]);
    useEffect( async ()=>{
        const blogs = await getSortedBlogsData();
        setBlogs(blogs);
    },[])
    const head1 = "Sustainability";
    const head2 = 'Starts With You';
    return (
        <div className="index">
            <Layout home>
                <Head>
                    <title>First Draft</title>
                </Head>
                <section className={`${styles.top_wrapper}`}>
                    <div className="px-3 py-3">
                        <div className={`${styles.nav_wrapper} d-flex justify-content-between align-items-center`}>
                            <span className={styles.title}>FIRST DRAFT</span>
                            {authState.auth.token?
                                <span id={styles.get_started_btn}>Welcome {authState.auth.user.name}</span>
                            :
                                <span className={styles.btn_cover}>
                                    <button id={styles.get_started_btn}
                                        onClick={()=>authDispatch(AuthActionCreators.authStateForm())}
                                    >GET STARTED</button>
                                </span>
                            }
                        </div>
                        <div className={styles.content_wrapper}>
                            <span className={styles.heading1}>{head1}</span>
                            <br/>
                            <span className={styles.heading2}>{head2}</span>
                        </div>
                    </div>
                </section>
                <section className="container">
                    <h4>Recent Stories</h4>
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

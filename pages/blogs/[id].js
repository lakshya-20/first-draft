import Layout from "../../components/layout";
import Head from 'next/head';
import Image from 'next/image'
import Link from 'next/link';
import {getBlogData} from '../../lib/blog';
import DateString from "../../components/date";
import styles from '../../styles/blog.module.css'
const Blog = ({blog}) => {
    return ( 
        <div>
            <Layout>
                <Head>
                    <title>{blog.title}</title>
                </Head>
                <header className="text-center">
        
                </header>
                <article>
                    <div className="p-2">
                        <div className="text-center">
                            <h3>{blog.title}</h3>
                            <br/>
                            {/******************TODO*******************/}
                            <Image
                                src={blog.img_header}
                                alt="Blog Image Header"
                                width={500}
                                height={300}
                                layout="intrinsic"
                            />
                        </div>
                        <div>
                            <h6>{blog.description}</h6>
                        </div>
                        <div>
                            <DateString dateString={blog.createdAt}/>
                        </div>
                        <hr/>
                    </div>                    
                    <div dangerouslySetInnerHTML={{ __html:blog.markdown }} />
                </article>        
                <hr/>        
                {/*****************************TODO*********************/}
                <div className={`d-flex justify-content-center ${styles.author_card}`}>
                    <div>
                        <div className={styles.author_name}>Author 
                            <Link href={`/profile/${blog.postedBy._id}`}>
                                <b className={styles.author_name_link}>{" "+blog.postedBy.name}</b>
                            </Link>       
                        </div>         
                        <div className={styles.author_about}>Lakshya is a computer whisperer</div>
                        <div className={`${styles.author_connect} d-flex justify-content-around`}>
                            <a href="#" target="_blank" className="text-secondary">
                                <i className="fa fa-medium"></i>
                            </a>
                            <a href="#" target="_blank" className="text-secondary">
                                <i className="fa fa-instagram"></i>
                            </a>
                            <a href="#" target="_blank" className="text-secondary">
                                <span className="fa fa-github fa-lg"></span>
                            </a>
                            <a href="#" target="_blank" className="text-secondary">
                                <span className="fa fa-linkedin fa-lg"></span>
                            </a>                      
                        </div>
                        <div className={styles.author_viewmore}>
                            <Link href={`/profile/${blog.postedBy._id}`}>
                                <button className={styles.author_viewmore_btn}>
                                    View More <i className="fa fa-angle-double-right fa-lg"></i>
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <Image
                            priority
                            src= {blog.postedBy.dp}
                            height={80}
                            width={80}
                            alt={blog.postedBy.name}
                            className="user_dp"
                        /> 
                    </div>
                </div>
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
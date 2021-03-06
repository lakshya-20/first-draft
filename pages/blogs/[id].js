import Layout from "@/components/Layout";
import DateString from "@/components/Date";
import Head from 'next/head';
import Image from 'next/image'
import Link from 'next/link';
import {getBlogData} from '@/lib/blog';
import styles from '@/styles/blog.module.css'
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
                            {blog.img_header?
                                <Image
                                    src={blog.img_header}
                                    alt="Blog Image Header"
                                    width={500}
                                    height={300}
                                    layout="intrinsic"
                                />
                            :
                                null
                            }
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
                <div className={`d-flex justify-content-center ${styles.author_card}`}>
                    <div>
                        <div className={styles.author_name}>Author 
                            <Link href={`/profile/${blog.postedBy._id}`}>
                                <b className={styles.author_name_link}>{" "+blog.postedBy.name}</b>
                            </Link>       
                        </div>         
                        <div className={styles.author_about}>{blog.postedBy.about}</div>
                        <div className={`${styles.author_connect} d-flex justify-content-around`}>
                            {blog.postedBy.socialLinks?
                                <>
                                    {blog.postedBy.socialLinks.medium?
                                        <a href={blog.postedBy.socialLinks.medium} target="_blank" className="text-secondary">
                                            <i className="fa fa-medium"></i>
                                        </a>        
                                    :
                                        null
                                    }
                                    {blog.postedBy.socialLinks.instagram?
                                        <a href={blog.postedBy.socialLinks.instagram} target="_blank" className="text-secondary">
                                            <i className="fa fa-instagram"></i>
                                        </a>        
                                    :
                                        null
                                    }
                                    {blog.postedBy.socialLinks.github?
                                        <a href={blog.postedBy.socialLinks.github} target="_blank" className="text-secondary">
                                            <span className="fa fa-github fa-lg"></span>
                                        </a>        
                                    :
                                        null
                                    }
                                    {blog.postedBy.socialLinks.linkedin?
                                        <a href={blog.postedBy.socialLinks.linkedin} target="_blank" className="text-secondary">
                                            <span className="fa fa-linkedin fa-lg"></span>
                                        </a>        
                                    :
                                        null
                                    }
                                </>
                            :
                                null
                            } 
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
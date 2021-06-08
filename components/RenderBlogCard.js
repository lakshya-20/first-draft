import {useContext} from 'react';
import {Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,Row, Col} from 'reactstrap';
import Link from 'next/link'
import DateString from './date';
import { AuthContext } from '../Context/AuthContext';
import Image from 'next/image';
import styles from '../styles/renderBlogCard.module.css';
const RenderBlogCard = ({blog,profile}) => {
    const {authState} = useContext(AuthContext);
    const deleteCard = async (id) =>{
        try{
            var response = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/blogs?id=${id}`,{
                method: "DELETE",
                headers:{
                    "Content-Type":"application/json",
                    api_key: process.env.NEXT_PUBLIC_apiKey,
                    authorization: authState.auth.token
                }
            })
            const blogData = await response.json();
            if(blogData.error){
                console.log(blogData.error)
                return;
            }
            console.log("Blog Delete Successful");
            window.location.reload();
        } catch(err){
            console.log(err.message);
        }
    }
    return (
        <Col sm="12" key={blog._id} className="pb-2">
            <div className="card">                            
                <div className="card-body d-flex align-items-center">
                    <div>
                        {blog.img_header?
                            <Image 
                                src={blog.img_header} 
                                alt="Blog Image Header" 
                                width={150}
                                height={100}
                            />
                        :
                            null
                        }
                    </div>
                    <div className="px-2">
                        <h4 className="card-title">{blog.title}</h4>
                        <h6 tag="h6" className={`card-subtitle text-muted d-flex align-items-center`}>                                            
                            {!profile?
                                <Link href={`/profile/${blog.postedBy._id}`}>
                                    <span className={styles.card_subtitle}>
                                        {blog.postedBy.name}
                                        &nbsp;&nbsp;
                                    </span>
                                </Link>
                            :
                                null
                            }
                            <span className="d-flex"><DateString dateString={blog.createdAt}/></span>
                        </h6>
                        <p className="card-text">
                            {blog.description}
                            <br/>
                            <Link href={`/blogs/${blog._id}`}>
                                <span className={styles.readmore_btn}>Read More</span>
                            </Link>

                        </p>
                    </div>
                    {(profile&&authState.auth.token)?
                        <div className="d-flex flex-column align-items-center">
                            <Link href={{
                                pathname: '/blogs/form',
                                query: { id: blog._id },
                            }}>
                                <span type="button">
                                    <i class="fa fa-edit"></i>
                                </span>
                            </Link>
                            <span className="px-2" type="button" onClick={()=>deleteCard(blog._id)}>
                                <i class="fa fa-trash"></i>
                            </span>
                        </div>
                    :
                        null
                    }
                </div>
            </div>
        </Col>
     );
}
 
export default RenderBlogCard;
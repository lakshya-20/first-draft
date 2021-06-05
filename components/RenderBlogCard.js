import {useContext} from 'react';
import {Card, CardTitle, CardText, Row, Col} from 'reactstrap';
import Link from 'next/link'
import DateString from './date';
import { AuthContext } from '../Context/AuthContext';
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
        <Col sm="12" key={blog._id} className="p-2">
                <Card body>
                    <Link href={`/blogs/${blog._id}`}>
                        <CardTitle tag="h5">{blog.title}</CardTitle>
                    </Link>
                    <div className="d-flex">
                        <span className="d-flex">Created At: <DateString dateString={blog.createdAt}/></span>
                    </div>
                    <CardText>
                        {blog.description}
                        {profile?
                            <div className="d-flex">
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
                    </CardText>
                </Card>
        </Col>
     );
}
 
export default RenderBlogCard;
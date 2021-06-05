import {useEffect, useContext, useState} from 'react'
import Layout from "../../components/layout"
import { AuthContext } from '../../Context/AuthContext';
import { useRouter } from 'next/router';
import {Link} from 'next/link';
import Head from "next/head";
import Image from 'next/image'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Yamde from "yamde";
import {getBlogData} from '../../lib/blog';
const NewBlog = ({blog}) => {
    const [title, setTitle] = useState(blog?blog.title:"");
    const [description, setDescription] = useState(blog?blog.description:"");
    const [markdown, setMarkdown] = useState(blog?blog.markdown:"Type Markdown");
    const [isLightMode, setIsLightMode] = useState(true);
    const {authState} = useContext(AuthContext);
    const router = useRouter();
    useEffect(()=>{
        if(!authState.auth.token){
            router.replace('/');
        }
    },[])
    const handleSubmit = async (update) =>{
        if(!(title&&description&&markdown)){
            console.log("All fields are required");
            return;
        }
        var blogData={
            title,
            description,
            markdown
        }
        try{
            var response=""
            {update?
                response = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/blogs?id=${blog._id}`,{
                    method: "PUT",
                    headers:{
                        "Content-Type":"application/json",
                        api_key: process.env.NEXT_PUBLIC_apiKey,
                        authorization: authState.auth.token
                    },
                    body: JSON.stringify(blogData)
                })
            :
                response = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/blogs`,{
                    method: "POST",
                    headers:{
                        "Content-Type":"application/json",
                        api_key: process.env.NEXT_PUBLIC_apiKey,
                        authorization: authState.auth.token
                    },
                    body: JSON.stringify(blogData)
                })
            }
            blogData = await response.json();
            if(blogData.error){
                console.log(blogData.error)
                return;
            }
            console.log("Operation Successful");
            router.replace(`/blogs/${blogData._id}`)
        } catch(err){
            console.log(err.message);
        }
    }
    return ( 
        <div>
            <Layout>
                <Head>
                    {blog?
                        <title>Update Blog</title>
                    :
                        <title>Add New</title>
                    }
                </Head>
                <header className="text-center">
                    {authState.auth.user?
                        <>
                        <Image
                            priority
                            src= {authState.auth.user.dp}
                            height={100}
                            width={100}
                            alt={authState.auth.user.name}
                            className="user_dp"
                        />     
                        <h4>{authState.auth.user.name}</h4>
                        </>
                    :
                        null
                    }
                </header>
                <section>
                    {blog?
                        <h3>Update Blog</h3>
                    :
                        <h3>Add New</h3>
                    }
                </section>
                <section>
                    <Form>
                        <Input type="text" name="title" placeholder="Blog Title" value={title} onChange={e=>setTitle(e.target.value)}/>
                        <br/>
                        <Input type="textarea" name="description" placeholder="Blog Description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
                        {/* <div
                            style={{
                            color: "blue",
                            textDecoration: "underline",
                            cursor: "pointer"
                            }}
                            onClick={() => setIsLightMode(!isLightMode)}
                        >
                            {`${isLightMode ? "Dark" : "Light"} Mode`}
                        </div> */}
                        <Yamde                        
                            value={markdown}
                            handler={setMarkdown}
                            theme={isLightMode ? "light" : "dark"}         
                        />
                    </Form>
                    <div className="d-flex justify-content-around align-items-center">
                        <Button className="btn btn-success" onClick={()=>handleSubmit(blog? true :false)}>Submit</Button>
                        <Button onClick={()=>router.back()}>Cancel</Button>
                    </div>
                    <br/>
                </section>
            </Layout>
        </div>
     );
}
 
export default NewBlog;

export async function getServerSideProps(context) {
    const {query: {id}} = context
    if(id=="new"){
        return {props: {blog:null}}
    }
    const blog = await getBlogData(id);
    return {props: {blog}}
}
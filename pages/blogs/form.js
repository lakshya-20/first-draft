import {useEffect, useContext, useState} from 'react'
import { Button, Form, FormGroup, Label, Input, FormText,
    Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { useRouter } from 'next/router';
import Head from "next/head";
import Image from 'next/image'
import Yamde from "yamde";
import Layout from "@/components/Layout";
import {getBlogData} from '@/lib/blog';
import styles from '@/styles/form.module.css';
import storageService from "@/lib/localStorageHelpers";
import { AuthContext } from '@/Context/AuthContext';
import * as AuthActionCreators from '@/Context/AuthActionCreater';
const NewBlog = ({blog}) => {
    const {authState, authDispatch} = useContext(AuthContext);
    const [title, setTitle] = useState(blog?blog.title:"");
    const [description, setDescription] = useState(blog?blog.description:"");
    const [markdown, setMarkdown] = useState(blog?blog.markdown:null);
    const [image, setImage] = useState();
    const [imageURL, setImageURL] = useState(blog?blog.img_header:null)
    const [imagePreview, setImagePreview] = useState();
    const [isLightMode, setIsLightMode] = useState(true);
    const [isProfileModalOpen, setIsProfileModalopen] = useState(false);
    const router = useRouter();
    const [about, setAbout] = useState(undefined);
    const [socialLinks, setSocialLinks] = useState({});
    useEffect(()=>{
        // if(!authState.auth.token){
        //     router.replace('/');
        // }
        const savedUser = storageService.loadUser();
        if(!savedUser){
            router.push("/");
        }
        else if(!savedUser.user.completeProfile){
            setIsProfileModalopen(true);
        }
    },[]);

    const toggleProfileModal = () =>{
        setIsProfileModalopen(!isProfileModalOpen);
    }
    const handleSocialLinkChange = (e) =>{
        const {name, value} = e.target;
        setSocialLinks({
            ...socialLinks,
            [name]: value
        })
    }
    const handleProfileChange = async () =>{
        try{
            const data={
                about,
                socialLinks
            }
            var response = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/auth`,{
                method: "PUT",
                headers:{
                    "Content-Type":"application/json",
                    api_key: process.env.NEXT_PUBLIC_apiKey,
                    authorization: authState.auth.token
                },
                body: JSON.stringify(data)
            })
            response = await response.json();
            if(response.error){
                console.log(response.error)
                router.push('/');
            }
            await authDispatch(AuthActionCreators.authStateUpdate(response))
            await storageService.saveUser(response);
            window.location.reload();
        } catch(err){
            console.log(err);
            router.push('/');
        }
    }
    const handleImageChange = (file) => {
        setImage(file);
        var preview = URL.createObjectURL(file)
        setImagePreview(preview);
    }
    const handleImageSubmit = async (file) => {
        const data = new FormData();
        data.append("file",file)
        data.append('upload_preset',"First Draft");
        data.append("cloud_name",process.env.NEXT_PUBLIC_cloudinaryCloudName)
        var resData = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_cloudinaryCloudName}/image/upload`,{
             method:"post",
             body:data
        })
        resData = await resData.json();
        return resData.url;
    }
    const handleSubmit = async (update) =>{
        if(!(title&&description&&markdown)){
            console.log("All fields are required");
            return;
        }
        
        try{
            var response="";
            var img_header=imageURL;
            if(image){
                var url = await handleImageSubmit(image);
                img_header=url;
            }
            var blogData={
                title,
                description,
                markdown,
                img_header
            }
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
                        <br/>
                        <input type="file" id="image_input" hidden onChange={(e)=>handleImageChange(e.target.files[0])}/>
                        <div className="text-center">
                            <label htmlFor="image_input">
                                <span>
                                    {(imagePreview||imageURL)?
                                        <div>
                                            <h6>Image Header</h6>
                                            <img src={imagePreview?imagePreview:imageURL} className={styles.image_input}/>
                                        </div>                                        
                                    :
                                        <div className={styles.image_input_btn}>
                                            Choose Image Header
                                        </div>
                                    }                                                
                                </span>
                            </label>
                        </div>
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
                        <br/>
                        <h6>Type Markdown</h6>
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
                <section>
                <Modal isOpen={isProfileModalOpen} toggle={toggleProfileModal} className="modal-dialog-centered">
                    <ModalHeader >Complete Your Profile</ModalHeader>
                    <ModalBody>
                        <Form>
                        <FormGroup>
                            <Label for="about">About <span className="required_symbol">*</span></Label>
                            <Input type="textarea" name="about" id="about" 
                                placeholder="A line that describes you" maxLength="150"
                                onChange={(e)=>setAbout(e.target.value)}
                            />
                        </FormGroup>                        
                        <FormGroup> 
                            <Label for="about">Social Links</Label>
                            <div className="d-flex align-items-center">
                                <i className="fa fa-medium px-2"></i>
                                <Input type="url" name="medium" placeholder="Your Medium Profile"
                                    onChange={(e)=>handleSocialLinkChange(e)}
                                />
                                <br/>
                                <i className="fa fa-instagram px-2"></i>
                                <Input type="url" name="instagram" placeholder="Your Instagram Profile"
                                    onChange={(e)=>handleSocialLinkChange(e)}
                                />
                            </div>
                            <div className="d-flex align-items-center py-2">
                                <i className="fa fa-github px-2"></i>
                                <Input type="url" name="github" placeholder="Your Github Profile"
                                    onChange={(e)=>handleSocialLinkChange(e)}
                                />
                                <br/>
                                <i className="fa fa-linkedin px-2"></i>
                                <Input type="url" name="linkedin" placeholder="Your Linkedin Profile"
                                    onChange={(e)=>handleSocialLinkChange(e)}
                                />
                            </div>
                        </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={()=>handleProfileChange()}>Submit</Button>{' '}
                        <Button color="secondary" onClick={()=>router.push('/')}>Cancel</Button>
                    </ModalFooter>
                </Modal>
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
import React, { useContext, useState, useEffect } from 'react';
import { Button, Modal, ModalBody, ModalFooter,
    TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, 
    Form, FormGroup, Input} from 'reactstrap';
import classnames from 'classnames';
import styles  from '../styles/temp.module.css'
import { AuthContext } from '../Context/AuthContext';
import * as AuthActionCreators from '../Context/AuthActionCreater';
import storageService from '../lib/localStorageHelpers';
const AuthForm = () => {
    const {authState, authDispatch} = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(authState.isFormOpen);
    const [activeTab, setActiveTab] = useState('1');
    const [viewSigninPassword,setViewSigninPassword] = useState(false);
    const [viewSignupPassword,setViewSignupPassword] = useState(false);
    const [viewSignupRePassword,setViewSignupRePassword] = useState(false);
    const [image, setImage] = useState("");
    const [values, setValues] = useState({
        dp: "",
        email: "",
        password: "",
        re_password: "",
        name: ""
    }) 
    useEffect(()=>{
        setIsModalOpen(authState.isFormOpen)
    },[authState.isFormOpen]) 
    // useEffect(()=>{
    //     alert("gbjk2222")
    // },[isModalOpen])   
    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({
          ...values,
          [name]: value,
        });
    };
    const handleImageChange = (file) => {
        setImage(file);
        var preview = URL.createObjectURL(file)        
        setValues({
            ...values,
            ["dp"]: preview,
        });
    }
    const resetValues = () =>{
        setValues({
            dp : "",
            email: "",
            password: "",
            re_password: "",
            name: ""
        })
        setViewSigninPassword(false);
        setViewSignupPassword(false);
        setViewSignupRePassword(false);
    }
    const toggleModal = () => {
        authDispatch(AuthActionCreators.authStateForm())        
        resetValues();
    }
    const toggleTab = tab => {
        if(activeTab !== tab) setActiveTab(tab);
        resetValues();
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
        // if (typeof window !== 'undefined') {
        //     alert(JSON.stringify(resData));
        // } 
        return resData.url;
    }
    const handleSubmit = async () =>{
        var action = "signin";
        if(activeTab=="2"){
            action = "signup"
        }  
        try{
            if(image){
                values["dp"] = await handleImageSubmit(image);
            }
            var resData  = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/auth?action=${action}`,{
                method: "POST",
                params: {
                    action : "signin"
                },
                headers: {
                    "api_key": process.env.NEXT_PUBLIC_apiKey,
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(values)
            })
            resData = await resData.json();
            if(resData.error){
                if (typeof window !== 'undefined') {
                    alert(JSON.stringify(resData.error));
                }
                return
            }
            // if (typeof window !== 'undefined') {
            //     alert(JSON.stringify(resData));
            // }
            await authDispatch(AuthActionCreators.authStateUpdate(resData))
            toggleModal();
            await storageService.saveUser(resData);
        }catch(err){
            if (typeof window !== 'undefined') {
                alert(err);
            }
        }                
    }
    return ( 
        <div>
            <Modal isOpen={isModalOpen} toggle={toggleModal} className="modal-dialog-centered">
                {/* <ModalHeader toggle={toggle}>Modal title</ModalHeader> */}
                <ModalBody >
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '1' })}
                                onClick={() => { toggleTab('1'); }}
                            >
                                Signin
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '2' })}
                                onClick={() => { toggleTab('2'); }}
                            >
                                Signup
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <Row>
                                <Col sm="12">                                    
                                    <Form className="pt-4 px-2">
                                        <FormGroup>
                                            <Input 
                                                type="text" 
                                                name="email"
                                                placeholder="Enter Your Email" 
                                                value={values.email} 
                                                onChange={(e)=>handleChange(e)}
                                            />
                                        </FormGroup>
                                        <br/>
                                        <FormGroup className="d-flex justify-content-between align-items-center">
                                            <Input 
                                                type={viewSigninPassword?"text":"password"} 
                                                name="password"
                                                placeholder="Enter Your Password" 
                                                value={values.password} 
                                                onChange={(e)=>handleChange(e)}                                
                                            />
                                            <span className="badge text-dark" type="button" onClick={()=>setViewSigninPassword(!viewSigninPassword)}>
                                                {!viewSigninPassword?
                                                    <i className="fa fa-eye fa-lg"></i>
                                                :   
                                                    <i className="fa fa-eye-slash fa-lg"></i>    
                                                }
                                            </span>
                                        </FormGroup>
                                    </Form>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <Col sm="12">
                                    <Form className="pt-4 px-2">
                                    <input type="file" id="actual-btn" hidden onChange={(e)=>handleImageChange(e.target.files[0])}/>
                                    <div className="text-center">
                                        <label htmlFor="actual-btn">
                                            <span>
                                                {values.dp!==""?
                                                    <img src={values.dp} className={styles.profile_input}/>    
                                                :
                                                    <img src="https://res.cloudinary.com/dstmsi8qv/image/upload/v1589909165/lfu6rm8plbhbrqyrpvey.png" className={styles.profile_input}/>
                                                }                                                
                                            </span>
                                        </label>
                                    </div>                                    
                                        <FormGroup>
                                            <Input 
                                                type="text" 
                                                name="name"
                                                placeholder="Enter Your Name" 
                                                value={values.name} 
                                                onChange={(e)=>handleChange(e)}                                                  
                                            />
                                        </FormGroup>
                                        <br/>
                                        <FormGroup>
                                            <Input 
                                                type="text" 
                                                name="email"
                                                placeholder="Enter Your Email" 
                                                value={values.email} 
                                                onChange={(e)=>handleChange(e)}
                                            />
                                        </FormGroup>
                                        <br/>
                                        <FormGroup className="d-flex justify-content-between align-items-center">
                                            <Input 
                                                type={viewSignupPassword?"text":"password"} 
                                                name="password"
                                                placeholder="Enter Your Password" 
                                                value={values.password} 
                                                onChange={(e)=>handleChange(e)}                                 
                                            />
                                            <span className="badge text-dark" type="button" onClick={()=>setViewSignupPassword(!viewSignupPassword)}>
                                                {!viewSignupPassword?
                                                    <i className="fa fa-eye fa-lg"></i>
                                                :   
                                                    <i className="fa fa-eye-slash fa-lg"></i>    
                                                }
                                            </span>
                                        </FormGroup>
                                        <br/>
                                        <FormGroup className="d-flex justify-content-between align-items-center">
                                            <Input 
                                                type={viewSignupRePassword?"text":"password"} 
                                                name="re_password"
                                                placeholder="Re-Enter Your Password" 
                                                value={values.re_password} 
                                                onChange={(e)=>handleChange(e)}                                 
                                            />
                                            <span className="badge text-dark" type="button" onClick={()=>setViewSignupRePassword(!viewSignupRePassword)}>
                                                {!viewSignupRePassword?
                                                    <i className="fa fa-eye fa-lg"></i>
                                                :   
                                                    <i className="fa fa-eye-slash fa-lg"></i>    
                                                }
                                            </span>
                                        </FormGroup>
                                    </Form>
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                </ModalBody>
                <ModalFooter>
                    
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <Row>
                                <Col sm="12">
                                    <Button color="primary" onClick={handleSubmit}>Signin</Button>{' '}
                                    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                            <Col sm="12">
                                    <Button color="primary" onClick={handleSubmit}>Signup</Button>{' '}
                                    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                </ModalFooter>
            </Modal>
        </div>
     );
}
 
export default AuthForm;
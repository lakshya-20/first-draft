export const signupValidator = (email, password) =>{
    const errors={};
    if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
        errors.email = "Invalid Email";
    }
    if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/.test(password)){
        errors.password = "Passsword must have Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character."
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

export const signinValidator = (email, password) =>{
    const errors ={};
    if(!email || email.trim() === ''){
        errors.email = "Email must not be empty";
    }
    if(!password){
        errors.password = "Password must not be empty";
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

export const newBlogvalidator = (title, description, markdown) =>{
    const errors = {};
    if(!title || title.trim() === ''){
        errors.title = "Title must not be empty";
    }
    if(!description || description.trim() === ''){
        errors.description = "Description must not be empty";
    }
    if(!markdown || markdown.trim() === ''){
        errors.description = "Markdown can not be empty";
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}
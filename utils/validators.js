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
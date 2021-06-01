export const getProfileData= async (id) =>{
    try{
        const responses = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/profile?id=${id}`,{
            headers:{
                api_key: process.env.NEXT_PUBLIC_apiKey
            }
        });
        const profile = await responses.json();
        if(profile.error){
            return {};
        }
        return profile;
    } catch(err){
        console.log(err.message)
    }
}
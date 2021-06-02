import path from 'path'
import remark from 'remark'
import html from 'remark-html'

export const getSortedBlogsData= async () =>{
    try{
        const responses = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/blogs`,{
            headers:{
                api_key: process.env.NEXT_PUBLIC_apiKey
            }
        });
        const blogs = await responses.json();
        if(blogs.error){
            return [];
        }
        return blogs;
    } catch(err){
        console.log(err.message)
    }
}

export async function getBlogData(id) {
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_baseURL}/api/blogs?id=${id}`,{
            headers:{
                api_key: process.env.NEXT_PUBLIC_apiKey
            }
        });
        const blogData = await response.json();
        if(blogData.error){
            return {}
        }
        const processedMarkdown = await remark().use(html).process(blogData.markdown);
        blogData.markdown=processedMarkdown.toString();     
        return blogData;      
    } catch(err){
        console.log(err.message);
    }
}

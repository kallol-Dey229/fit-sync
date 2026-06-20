'use server'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createClass = async (data) =>{
    const res = await fetch(`${baseUrl}/api/classes`,{
        method:'POST',
        headers:{
            'Content-Type' : 'application/json'
        },

        body:JSON.stringify(data)
    });

    return res.json();
}
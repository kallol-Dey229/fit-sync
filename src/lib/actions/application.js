
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const applyAsTrainer = async (data) =>{
    const res = await fetch(`${baseUrl}/api/application`,{
        method:'POST',
        headers:{
            'Content-Type' : 'application/json'
        },

        body:JSON.stringify(data)
    });

    return res.json();
}
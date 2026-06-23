
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




export const getMyApplication = async (userId) => {
    const res = await fetch(`${baseUrl}/api/application/user/${userId}`);
    return res.json();
}
 
 
export const updateApplicationStatus = async (applicationId, status) => {
    const res = await fetch(`${baseUrl}/api/application/${applicationId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
    });
 
    return res.json();
}
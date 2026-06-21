

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getClass = async (trainerId, status = 'active') =>{
    const res = await fetch(`${baseUrl}/api/my/classes?id=${trainerId}&status=${status}`);
    return res.json();
}


export const getAllClass = async () =>{
    const res = await fetch(`${baseUrl}/api/classes`);
    return res.json();
}





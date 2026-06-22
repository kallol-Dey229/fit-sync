

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getClass = async (trainerId, status = 'active') =>{
    const res = await fetch(`${baseUrl}/api/my/classes?id=${trainerId}&status=${status}`);
    return res.json();
}


export const getAllClass = async () =>{
    const res = await fetch(`${baseUrl}/api/classes`);
    return res.json();
}

export const getClassById = async (classId) =>{
    const res = await fetch(`${baseUrl}/api/classes/${classId}`);
    return res.json();
}



export const getFavorites = async (userId) => {
    if (!userId) return { success: false, data: [] };
    const res = await fetch(`${baseUrl}/api/favorites?userId=${userId}`);
    return res.json();
}





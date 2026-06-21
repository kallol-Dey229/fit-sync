const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export const getForumPosts = async (trainerId) =>{
    const res = await fetch(`${baseUrl}/api/my/forum?trainerId=${trainerId}`);
    return res.json();
}



export const getAllForumPosts = async () =>{
    const res = await fetch(`${baseUrl}/api/forum`);
    return res.json();
}
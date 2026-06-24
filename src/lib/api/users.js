

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;



export const getAllUsers = async () =>{
    const res = await fetch(`${baseUrl}/api/user`);
    return res.json();
}





export const setUserStatus = async (userId, status) => {
    const res = await fetch(`${baseUrl}/api/user/${userId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
    });
 
    return res.json();
}
 
export const promoteToAdmin = async (userId) => {
    const res = await fetch(`${baseUrl}/api/user/${userId}/role`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'promote' }),
    });
 
    return res.json();
}
 
export const demoteFromAdmin = async (userId) => {
    const res = await fetch(`${baseUrl}/api/user/${userId}/role`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'demote' }),
    });
 
    return res.json();
}
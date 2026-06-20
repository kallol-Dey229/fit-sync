

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getClass = async (trainerId, status = 'active') =>{
    const res = await fetch(`${baseUrl}/api/classes?id=${trainerId}&status=${status}`);
    return res.json();
}
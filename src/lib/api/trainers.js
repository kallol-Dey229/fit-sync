const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
 
export const getAllTrainers = async () => {
    const res = await fetch(`${baseUrl}/api/trainers`, { cache: 'no-store' });
    return res.json();
}
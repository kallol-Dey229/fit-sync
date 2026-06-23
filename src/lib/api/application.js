
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getAllApplication = async () =>{
    const res = await fetch(`${baseUrl}/api/application`);
    return res.json();
}
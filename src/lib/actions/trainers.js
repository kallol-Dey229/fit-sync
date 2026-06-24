const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
 
export const demoteTrainerToUser = async (userId) => {
    const res = await fetch(`${baseUrl}/api/user/${userId}/role`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'demote-trainer' }),
    });
 
    return res.json();
}
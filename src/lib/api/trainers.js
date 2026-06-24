const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
 
export const getAllTrainers = async () => {
  const res = await fetch(`${baseUrl}/api/trainers`, {
    cache: "no-store",
  });

  console.log("Status:", res.status);
  console.log("URL:", res.url);

  const text = await res.text();
  console.log(text);

  return JSON.parse(text);
};
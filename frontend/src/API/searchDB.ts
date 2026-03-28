const BASE_URI = import.meta.env.VITE_APP_API_URL || "http://localhost:3000/api/csc";

export const searchDB = async (
  searchTerm: string,
  limit: number,
  offset: number
) => {
  const response = await fetch(
    `${BASE_URI}/search?search=${searchTerm}&limit=${limit}&offSet=${offset}`
  );
  const data = await response.json();
  return data;
};

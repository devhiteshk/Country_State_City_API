const BASE_URI = "http://localhost:911";

export const searchDB = async (
  searchTerm: string,
  limit: number,
  offset: number
) => {
  const response = await fetch(
    `${BASE_URI}/api/v1/search-db?search=${searchTerm}&limit=${limit}&offSet=${offset}`
  );
  const data = await response.json();
  return data;
};

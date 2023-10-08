import headers from "../../constants/headers";

const fetchUserFromDiscord = async (userId: string): Promise<{ global_name?: string; username: string }> => {
  const response = await fetch(`https://discord.com/api/users/${userId}`, { headers });
  return response.json();
};

export default fetchUserFromDiscord;

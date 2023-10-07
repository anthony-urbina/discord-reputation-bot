import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const createGlobalCommands = async ({ appId }) => {
  const discordApi = axios.create({
    baseURL: "https://discord.com/api/v9",
    headers: {
      Authorization: `Bot ${process.env.DISCORD_PRIVATE_KEY}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
  });

  try {
    const body = {
      name: "add",
      description: "Add a review for a user",
      options: [
        {
          name: "user",
          description: "Select a user to review",
          type: 2,
          // required: true,
          options: [
            {
              name: "positive",
              description: "Positive review",
              type: 1,
              options: [
                {
                  name: "user",
                  description: "The user to get",
                  type: 6,
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    };
    const DISCORD_API_URL = `/applications/${appId}/commands`;
    const res = await discordApi.post(DISCORD_API_URL, body);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

createGlobalCommands({ appId: process.env.DISCORD_APP_ID });

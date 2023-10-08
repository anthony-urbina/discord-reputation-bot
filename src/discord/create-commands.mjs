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
      description: "Submit a review for another user.",

      options: [
        {
          name: "positive",
          description: "Leave a positive review for a user.",
          type: 1,
          options: [
            {
              name: "user",
              description: "Select the user you'd like to review positively.",
              type: 6,
              required: true,
            },
          ],
        },
        {
          name: "negative",
          description: "Leave a negative review for a user.",
          type: 1,
          options: [
            {
              name: "user",
              description: "Select the user you'd like to review negatively.",
              type: 6,
              required: true,
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

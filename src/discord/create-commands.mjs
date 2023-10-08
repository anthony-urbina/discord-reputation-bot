import axios from "axios";
import { getCommand, addCommand } from "../../constants/commands";
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
    const DISCORD_API_URL = `/applications/${appId}/commands`;
    const res = await discordApi.post(DISCORD_API_URL, getCommand);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

createGlobalCommands({ appId: process.env.DISCORD_APP_ID });

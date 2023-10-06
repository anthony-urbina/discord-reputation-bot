import axios from "axios";

export const discordApi = axios.create({
  baseURL: "https://discord.com/api/v10",
  headers: {
    Authorization: `Bot ${process.env.DISCORD_PRIVATE_KEY}`,
    "Content-Type": "application/json; charset=UTF-8",
  },
});

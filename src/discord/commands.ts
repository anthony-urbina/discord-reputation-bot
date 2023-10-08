import { discordApi } from "./client";

export const getGlobalCommands = async ({ appId }: { appId: string }) => {
  try {
    const res = await discordApi.get(`/applications/${appId}/commands`);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

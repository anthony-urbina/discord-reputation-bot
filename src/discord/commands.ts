import { discordApi } from "./client";

export const getGlobalCommands = async ({ appId }: { appId: string }) => {
  try {
    console.log("appId", appId);
    const res = await discordApi.get(`/applications/${appId}/commands`);
    console.log("commands res", res.data);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

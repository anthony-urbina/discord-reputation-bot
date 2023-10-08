import { verifyInteractionsRequest } from "@/discord/verify";
import { InteractionType, InteractionResponseType } from "discord-api-types/v10";
import { NextResponse } from "next/server";
import handleModalSubmit from "../../../../utils/handleModalSubmit";
import handleAppCommand from "../../../../utils/handleAppComand";

export const runtime = "edge";

const Application = {
  id: process.env.DISCORD_APP_ID!,
  publicKey: process.env.DISCORD_PUBLIC_KEY!,
  token: process.env.DISCORD_PRIVATE_KEY!,
};

export async function POST(req: Request) {
  const { isVerified, interaction } = await verifyInteractionsRequest(req, Application.publicKey!);
  if (!isVerified) return NextResponse.json({ error: "invalid request signature" }, { status: 401 });

  if (interaction?.type === InteractionType.Ping) {
    return NextResponse.json({ type: InteractionResponseType.Pong }, { status: 200 });
  } else if (interaction?.type === InteractionType.ApplicationCommand) {
    const interactionRes = await handleAppCommand(interaction);

    return NextResponse.json(interactionRes, { status: 200 });
  } else if (interaction?.type === InteractionType.ModalSubmit) {
    try {
      const res = await handleModalSubmit(interaction);
      const interactionRes = res?.interactionRes;

      return NextResponse.json(interactionRes, { status: 200 });
    } catch (err) {
      console.error("err", err);
    }
  }
  return NextResponse.json({ error: "Internal Service Error" }, { status: 500 });
}

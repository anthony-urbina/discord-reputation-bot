import { verifyInteractionsRequest } from "@/discord/verify";
import { InteractionType, InteractionResponseType } from "discord-api-types/v10";

import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request, res: NextApiResponse) {
  const { isVerified, interaction } = await verifyInteractionsRequest(req, process.env.DISCORD_PUBLIC_KEY!);
  if (!isVerified) return NextResponse.json({ error: "invalid request signature" }, { status: 401 });

  if (interaction?.type === InteractionType.Ping) {
    // The `PING` message is used during the initial webhook handshake, and is
    // required to configure the webhook in the developer portal.
    return NextResponse.json({ type: InteractionResponseType.Pong }, { status: 200 });
  }

  //   if (interaction?.type === InteractionType.Ping) {
  //     const resBody = {
  //       type: InteractionResponseType.Pong,
  //       //   data: { content: "Hello world!" },
  //     };
  //     res.status(200).send(resBody);
  //   }
}

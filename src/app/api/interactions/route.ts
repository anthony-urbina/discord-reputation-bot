import { verifyInteractionsRequest } from "@/discord/verify";
import { InteractionType, InteractionResponseType } from "discord-api-types/v10";
import { InputText, MessageComponent } from "discord-interactions";

import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request, res: NextApiResponse) {
  const { isVerified, interaction } = await verifyInteractionsRequest(req, process.env.DISCORD_PUBLIC_KEY!);
  if (!isVerified) return NextResponse.json({ error: "invalid request signature" }, { status: 401 });

  console.log("interaction name", interaction?.data);

  if (interaction?.type === InteractionType.Ping) {
    return NextResponse.json({ type: InteractionResponseType.Pong }, { status: 200 });
  } else if (interaction?.type === InteractionType.ApplicationCommand) {
    const { name } = interaction.data;
    await handleAppCommand(name);
  } else if (interaction?.type === InteractionType.ModalSubmit) {
    // handleModalSubmit(interaction);
  }

  return NextResponse.json({ error: "Internal Service Error" }, { status: 500 });
}

const handleAppCommand = async (name: string) => {
  if (name === "test") {
    const resBody = {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: { content: "Hello world!" },
    };
    return NextResponse.json(resBody, { status: 200 });
  } else if (name === "add") {
    const resBody = {
      type: InteractionResponseType.Modal,
      data: {
        title: "Submit Review",
        custom_id: "review_modal",
        components: [
          {
            type: 1,
            components: [
              {
                type: 4,
                custom_id: "body",
                label: "Body",
                style: 1,
                min_length: 1,
                max_length: 100,
                placeholder: "Enter your review here",
                required: true,
              },
            ],
          },
        ],
      },
    };
    return NextResponse.json(resBody, { status: 200 });
  }
};

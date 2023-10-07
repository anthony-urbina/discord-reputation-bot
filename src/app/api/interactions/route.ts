import { verifyInteractionsRequest } from "@/discord/verify";
import {
  InteractionType,
  InteractionResponseType,
  APIChatInputApplicationCommandInteraction,
  APIApplicationCommandSubcommandGroupOption,
  APIApplicationCommandInteraction,
  APIApplicationCommandOption,
  APIApplicationCommandUserOption,
} from "discord-api-types/v10";
import { InputText, MessageComponent } from "discord-interactions";

import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST(req: Request, res: NextApiResponse) {
  const { isVerified, interaction } = await verifyInteractionsRequest(req, process.env.DISCORD_PUBLIC_KEY!);
  if (!isVerified) return NextResponse.json({ error: "invalid request signature" }, { status: 401 });

  // console.log("interaction data", interaction);

  if (interaction?.type === InteractionType.Ping) {
    return NextResponse.json({ type: InteractionResponseType.Pong }, { status: 200 });
  } else if (interaction?.type === InteractionType.ApplicationCommand) {
    await handleAppCommand(interaction);
  } else if (interaction?.type === InteractionType.ModalSubmit) {
    // handleModalSubmit(interaction);
  }

  return NextResponse.json({ error: "Internal Service Error" }, { status: 500 });
}

const handleAppCommand = async (interaction: APIChatInputApplicationCommandInteraction) => {
  const { name } = interaction.data;

  if (name === "test") {
    const resBody = {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: { content: "Hello world!" },
    };
    return NextResponse.json(resBody, { status: 200 });
  } else if (name === "add") {
    const options = interaction.data.options as any;

    const receivedById = options[0].options[0].options[0].value;
    console.log("receivedById", receivedById);

    const writtenById = interaction.member?.user.id;
    console.log("writtenById", writtenById);

    const positiveOrNegative = options[0].options[0].name.toUpperCase();
    console.log("positiveOrNegative", positiveOrNegative);

    if (!writtenById) throw new Error("No user id found");

    try {
      const reviewId = await prisma.review.create({
        data: {
          receivedById,
          writtenById,
          type: positiveOrNegative,
        },
        select: {
          id: true,
        },
      });

      console.log("reviewId", reviewId);

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
                  custom_id: reviewId,
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
    } catch (err) {
      console.error("err", err);
    }
  }
};

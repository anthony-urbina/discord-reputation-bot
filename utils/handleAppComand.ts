import { APIChatInputApplicationCommandInteraction, InteractionResponseType } from "discord-api-types/v10";
import { prisma } from "../lib/prisma";

export default async function handleAppCommand(interaction: APIChatInputApplicationCommandInteraction) {
  const { name } = interaction.data;

  if (name === "test") {
    const interactionRes = {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: { content: "Hello world!" },
    };
    return interactionRes;
  } else if (name === "add") {
    const options = interaction.data.options as any;

    const receivedById = options[0].options[0].value;

    const writtenById = interaction.member?.user.id;

    const positiveOrNegative = options[0].name.toUpperCase();

    if (!writtenById) throw new Error("No user id found");
    if (!receivedById) throw new Error("No user id found");
    if (receivedById === writtenById) throw new Error("You can't review yourself");

    try {
      const review = await prisma.review.create({
        data: {
          receivedById,
          writtenById,
          type: positiveOrNegative,
        },
        select: {
          id: true,
        },
      });

      const reviewId = review.id.toString();

      const interactionRes = {
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

      return interactionRes;
    } catch (err) {
      console.error("err", err);
    }
  }
}

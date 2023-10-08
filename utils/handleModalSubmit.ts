import { APIModalSubmitInteraction, InteractionResponseType } from "discord-api-types/v10";
import { prisma } from "../lib/prisma";
import { discordApi } from "@/discord/client";
import { createReviewEmbed } from "./createReviewEmbed";

export default async function handleModalSubmit(interaction: APIModalSubmitInteraction) {
  const { data } = interaction;

  const reviewId = Number(data.components[0].components[0].custom_id);

  const body = interaction.data.components[0].components[0].value;

  try {
    const review = await prisma.review.update({
      where: { id: reviewId },
      data: {
        body,
      },
      select: {
        receivedById: true,
      },
    });

    const { receivedById } = review;
    const last3Reviews = await prisma.review.findMany({
      where: {
        receivedById,
        isDeleted: false,
      },
      take: 3,
      orderBy: {
        createdAt: "desc",
      },
    });

    const positiveCount = await prisma.review.count({
      where: {
        receivedById,
        type: "POSITIVE",
      },
    });

    const negativeCount = await prisma.review.count({
      where: {
        receivedById,
        type: "NEGATIVE",
      },
    });

    const getUserRes = await discordApi.get(`/users/${receivedById}`);
    const { global_name, username } = getUserRes.data;

    const reviewEmbed = createReviewEmbed({
      last3Reviews,
      negativeCount: negativeCount.toString(),
      positiveCount: positiveCount.toString(),
      receivedByUsername: global_name ?? username,
    });

    const interactionRes = {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: { embeds: reviewEmbed },
    };

    return { interactionRes };
  } catch (err) {
    console.error("err", err);
  }
}

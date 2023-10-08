import { APIModalSubmitInteraction, InteractionResponseType } from "discord-api-types/v10";
import headers from "../constants/headers";
import updateReview from "./query/updateReview";
import constructReviewEmbedForUser from "./constructReviewEmbedForUser";

export default async function handleModalSubmit(interaction: APIModalSubmitInteraction) {
  const { data } = interaction;

  const reviewId = Number(data.components[0].components[0].custom_id);

  const body = interaction.data.components[0].components[0].value;

  try {
    const review = await updateReview(reviewId, body);
    const reviewEmbed = await constructReviewEmbedForUser(review.receivedById);

    const interactionRes = {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: { embeds: reviewEmbed },
    };

    return { interactionRes };
  } catch (err) {
    console.error("err", err);
  }
}

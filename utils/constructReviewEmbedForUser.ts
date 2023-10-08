import { assembleDataIntoEmbed } from "./assembleDataIntoEmbed";
import countReviewsByType from "./query/countReviewsByType";
import fetchLast3Reviews from "./query/fetchLast3Reviews";
import fetchUserFromDiscord from "./query/fetchUserFromDiscord";

async function constructReviewEmbedForUser(userId: string) {
  const last3Reviews = await fetchLast3Reviews(userId);
  const positiveCount = await countReviewsByType(userId, "POSITIVE");
  const negativeCount = await countReviewsByType(userId, "NEGATIVE");
  const { global_name, username } = await fetchUserFromDiscord(userId);

  return assembleDataIntoEmbed({
    last3Reviews,
    negativeCount: negativeCount.toString(),
    positiveCount: positiveCount.toString(),
    receivedByUsername: global_name ?? username, // if global_name is undefined, use username as fallback
  });
}

export default constructReviewEmbedForUser;

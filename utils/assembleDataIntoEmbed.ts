import { Review } from "@prisma/client";
import { idToUsername } from "./idToUsername";
import { EmbedType } from "discord-api-types/v10";
import formatDate from "./formatDate";

interface AssembleDataIntoEmbedProps {
  last3Reviews: Review[];
  positiveCount: string;
  negativeCount: string;
  receivedByUsername: string;
}

export const assembleDataIntoEmbed = ({
  last3Reviews,
  positiveCount,
  negativeCount,
  receivedByUsername,
}: AssembleDataIntoEmbedProps) => {
  const reviewBodies = last3Reviews.map((review) => review.body);
  const reviewDates = last3Reviews.map((review) => formatDate(review.createdAt));
  const authorIds = last3Reviews.map((review) => review.writtenById);
  const authorUsernames = authorIds.map((id) => idToUsername(id));

  const maxReviewsToShow = 3;

  // Combine review bodies, dates, and author usernames into a single array of strings
  const combinedReviews = reviewBodies
    .map((body, index) => {
      if (body) {
        return `${body} -${authorUsernames[index]} _${reviewDates[index]}_`;
      }
      return null;
    })
    .filter(Boolean); // Filter out any null or undefined values

  // Handle case where there are no reviews
  if (combinedReviews.length === 0) {
    combinedReviews.push("No reviews yet");
  }

  // Format the reviews for the embed description
  const formattedReviews = combinedReviews
    .slice(0, maxReviewsToShow)
    .map((review, index) => `**${index + 1}.** ${review}`)
    .join("\n");

  const totalCount = Number(positiveCount) + Number(negativeCount);
  const embeds = [
    {
      title: `${receivedByUsername}'s Reviews (${totalCount.toString()})`,
      description: `**Latest:**\n${formattedReviews}`,
      color: 3980363,
      type: "rich",
      fields: [
        {
          name: "Positive 👍",
          value: positiveCount,
          inline: true,
        },
        {
          name: "Negative 👎",
          value: negativeCount,
          inline: true,
        },
      ],
    },
  ];

  return embeds;
};

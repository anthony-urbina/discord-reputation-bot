import { Review } from "@prisma/client";
import { idToUsername } from "./idToUsername";
import { EmbedType } from "discord-api-types/v10";

interface CreateReviewEmbedProps {
  last3Reviews: Review[];
  positiveCount: string;
  negativeCount: string;
  receivedByUsername: string;
}

export const createReviewEmbed = ({
  last3Reviews,
  positiveCount,
  negativeCount,
  receivedByUsername,
}: CreateReviewEmbedProps) => {
  const reviewBodies = last3Reviews.map((review) => review.body);
  const authorIds = last3Reviews.map((review) => review.writtenById);
  const authorUsernames = authorIds.map((id) => idToUsername(id));

  const embeds = [
    {
      title: `${receivedByUsername} 's Reviews`,
      description: `**Latest Reviews:**\n**1.** ${reviewBodies[0]} -${authorUsernames[0]}\n**2.** ${reviewBodies[1]} -${authorUsernames[1]}\n**3.** ${reviewBodies[2]} -${authorUsernames[2]}`,
      color: 3980363,
      type: "rich",
      fields: [
        {
          name: "Positive",
          value: positiveCount,
          inline: true,
        },
        {
          name: "Negative",
          value: negativeCount,
          inline: true,
        },
      ],
    },
  ];

  return embeds;
};

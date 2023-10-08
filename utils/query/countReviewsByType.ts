import { prisma } from "../../lib/prisma";

const countReviewsByType = async (receivedById: string, type: "POSITIVE" | "NEGATIVE"): Promise<number> => {
  return prisma.review.count({
    where: {
      receivedById,
      type,
    },
  });
};

export default countReviewsByType;

import { prisma } from "../../lib/prisma";

const updateReview = async (reviewId: number, body: string): Promise<{ receivedById: string }> => {
  return prisma.review.update({
    where: { id: reviewId },
    data: {
      body,
    },
    select: {
      receivedById: true,
    },
  });
};

export default updateReview;

import { Review } from "@prisma/client";
import { prisma } from "../../lib/prisma";

const fetchLast3Reviews = async (receivedById: string): Promise<Review[]> => {
  return prisma.review.findMany({
    where: {
      receivedById,
      isDeleted: false,
    },
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
  });
};

export default fetchLast3Reviews;

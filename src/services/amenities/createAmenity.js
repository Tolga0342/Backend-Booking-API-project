import { PrismaClient } from "@prisma/client";

const createAmenity = async (name) => {
  const prisma = new PrismaClient();

  if (!name) {
    // throw new Error("name not found");
    return null;
  }

  return prisma.amenity.create({
    data: {
      name,
    },
  });
};

export default createAmenity;

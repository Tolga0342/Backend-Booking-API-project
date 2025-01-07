import { PrismaClient } from "@prisma/client";

const getProperties = async (location, pricePerNight) => {
  const prisma = new PrismaClient();

  const newPricePerNight = pricePerNight
    ? parseFloat(pricePerNight)
    : undefined;

  return prisma.property.findMany({
    where: {
      ...(location && { location }),
      ...(newPricePerNight && { pricePerNight: newPricePerNight }),
    },
  });
};

export default getProperties;

import NotFoundError from "../../errors/notFoundError.js";
import { PrismaClient } from "@prisma/client";

const getAmenityById = async (id) => {
  const prisma = new PrismaClient();
  const amenity = await prisma.amenity.findUnique({
    where: {
      id,
    },
  });

  if (!amenity) {
    throw new NotFoundError("Amenity", id);
  }

  return amenity;
};

export default getAmenityById;

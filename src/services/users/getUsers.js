import { PrismaClient } from "@prisma/client";

const getUsers = async (username, email) => {
  const prisma = new PrismaClient();

  return prisma.user.findMany({
    where: {
      username,
      email,
    },
    select: {
      id: true,
      username: true,
      email: true,
      phoneNumber: true,
      name: true,
      profilePicture: true,
    },
  });
};

export default getUsers;

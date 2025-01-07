import { PrismaClient } from "@prisma/client";
import userData from "../data/users.json" assert { type: "json" };
import bookingData from "../data/bookings.json" assert { type: "json" };
import propertyData from "../data/properties.json" assert { type: "json" };
import reviewData from "../data/reviews.json" assert { type: "json" };
import hostData from "../data/hosts.json" assert { type: "json" };
import amenityData from "../data/amenities.json" assert { type: "json" };

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

async function main() {
  const { users } = userData;
  const { bookings } = bookingData;
  const { properties } = propertyData;
  const { reviews } = reviewData;
  const { hosts } = hostData;
  const { amenities } = amenityData;

  // amenity
  for (const amenity of amenities) {
    await prisma.amenity.upsert({
      where: { id: amenity.id },
      update: {},
      create: amenity,
    });
  }

  // booking
  for (const booking of bookings) {
    await prisma.booking.upsert({
      where: { id: booking.id },
      update: {},
      create: booking,
    });
  }

  //host
  for (const host of hosts) {
    await prisma.host.upsert({
      where: { id: host.id },
      update: {},
      create: host,
    });
  }

  //property
  for (const property of properties) {
    await prisma.property.upsert({
      where: { id: property.id },
      update: {},
      create: property,
    });
  }

  //review
  for (const review of reviews) {
    await prisma.review.upsert({
      where: { id: review.id },
      update: {},
      create: review,
    });
  }

  //user
  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user,
    });
  }
}

// promise handlers
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

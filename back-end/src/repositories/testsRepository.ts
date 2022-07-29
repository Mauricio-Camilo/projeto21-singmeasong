import { prisma } from "../database.js";

export async function resetDatabase() {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations RESTART IDENTITY;`;
}

export async function seedDatabase() {
  await prisma.recommendation.createMany({
    data: [
      {
        name: "Party Rock - LMFAO",
        youtubeLink: "https://www.youtube.com/watch?v=KQ6zr6kCPj8",
      },
      {
        name: "Summer - Calvin Harris",
        youtubeLink: "https://www.youtube.com/watch?v=ebXbLfLACGM",
      },
      {
        name: "Megami no Senshi - Saint Seiya",
        youtubeLink: "https://www.youtube.com/watch?v=EQcFyt37unE",
      },
      {
        name: "Dan dan kokoro - Dragon Ball GT",
        youtubeLink: "https://www.youtube.com/watch?v=uC8sc0cQa9M",
      },
    ],
  });
}


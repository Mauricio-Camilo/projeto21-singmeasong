import { prisma } from "./../../src/database.js";
import { faker } from '@faker-js/faker';

export function createRecommendation () {
    const name = "Musica muito top"
    const youtubeLink = "https://www.youtube.com/watch?v=chwyjJbcs1Y"
    return ({
        name,
        youtubeLink,
    })
}

interface Recommendation {
    name: string
    youtubeLink: string
}

export async function postRecommendation (data: Recommendation) {
    const {name, youtubeLink} = data
    const recommendation = await prisma.recommendation.create({
        data: {
            name,
            youtubeLink
        }
    });
}

import {prisma} from "./../src/database.js";
import supertest from "supertest";
import app from "./../src/app.js";
import dotenv from "dotenv";
import * as recommendationFactory from "./factories/recommendationFactory.js"

dotenv.config();

beforeEach(async () => {
    await prisma.$executeRaw`DELETE FROM recommendations WHERE name = 'Musica muito top'`;
})

describe("Recommendation tests suite", () => {

    it("given name and youtube link, create recommendation", async () => {
        const recommendationMusic = recommendationFactory.createRecommendation();
        const response = await supertest(app).post("/recommendations").send(recommendationMusic);
        expect (response.statusCode).toBe(201);

        const recommendation = await prisma.recommendation.findFirst({where : {name: recommendationMusic.name}});
        expect(recommendation.name).toBe(recommendationMusic.name);
    });

    it("given already used name, fail to create recommendation", async () => {
        const recommendationMusic = recommendationFactory.createRecommendation();
        await recommendationFactory.postRecommendation(recommendationMusic);

        const response = await supertest(app).post("/recommendations").send(recommendationMusic);
        expect(response.statusCode).toBe(409);
    });

    it("given invalid inputs, fail to create recommendation", async () => {
        const recommendationMusic = recommendationFactory.createRecommendation();
        recommendationMusic.youtubeLink = "https://www.tiktok.com/watch?v=chwyjJbcs1Y"

        const response = await supertest(app).post("/recommendations").send(recommendationMusic);
        expect(response.statusCode).toBe(422);
    });

})
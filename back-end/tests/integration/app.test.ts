import {prisma} from "../../src/database.js";
import supertest from "supertest";
import app from "../../src/app.js";
import dotenv from "dotenv";
import * as recommendationFactory from "../factories/recommendationFactory.js";
import * as scenarioFactory from "../factories/scenarioFactory.js";


dotenv.config();

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations RESTART IDENTITY`;
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

describe("Upvote and Updown tests suite", () => {
    it("given a valid recommendation, up the score", async () => {
        const scenario = await scenarioFactory.createScenarioOneOneRecommendation();
        const response = await supertest(app).post(`/recommendations/${scenario.id}/upvote`)
        expect(response.statusCode).toBe(200);
    })

    it("given a valid recommendation, down the score", async () => {
        const scenario = await scenarioFactory.createScenarioOneOneRecommendation();
        const response = await supertest(app).post(`/recommendations/${scenario.id}/downvote`)
        expect(response.statusCode).toBe(200);
    })

    it("given an invalid recommendation, fail to change score", async () => {
        const scenario = await scenarioFactory.createScenarioOneOneRecommendation();
        scenario.id = 10;
        const response = await supertest(app).post(`/recommendations/${scenario.id}/downvote`)
        expect(response.statusCode).toBe(404);
    })
})

describe("Get recommendations tests suite", () => {
    it("should return all recommendations", async () => {
        const scenario = await scenarioFactory.createScenarioTwoMoreThan10Recommendations();
        const response = await supertest(app).get("/recommendations");
        const index = Math.floor(Math.random() * 9);
        expect(response.body.length).toBe(10);
        expect(scenario[index]).toEqual(response.body[index]);
    })

    it("should return recommendation by Id", async () => {
        const scenario = await scenarioFactory.createScenarioOneOneRecommendation();
        const response = await supertest(app).get(`/recommendations/${scenario.id}`);
        expect(scenario).toEqual(response.body);
    })

    it("given an invalid id, fail to get recommendation", async () => {
        const scenario = await scenarioFactory.createScenarioOneOneRecommendation();
        scenario.id = 10;
        const response = await supertest(app).get(`/recommendations/${scenario.id}`);
        expect(response.statusCode).toBe(404);
    })
})

describe("Get advanced recommendations tests suite", () => {
    it("should return random recommendations", async () => {
        const scenario = await scenarioFactory.createScenarioTwoMoreThan10Recommendations();
        const response = await supertest(app).get("/recommendations/random");
        const checkRecommendation = scenario.find(song => song.name === response.body.name);
        expect(checkRecommendation).not.toBeUndefined();
    })

    it("no recommendations in the database, should return error", async () => {
        const response = await supertest(app).get("/recommendations/random");
        expect(response.statusCode).toBe(404);
    })

    it("should return top musics", async () => {
        const scenario1 = await scenarioFactory.createScenarioOneOneRecommendation();
        const scenario2 = await scenarioFactory.createScenarioOneOneRecommendation();
        const amount = 2;
        await supertest(app).post(`/recommendations/${scenario1.id}/upvote`);
        const response = await supertest(app).get(`/recommendations/top/${amount}`);
        expect(response.body[0].name).toEqual(scenario1.name);
        expect(response.body[1].name).toEqual(scenario2.name);
    })
})
/// <reference types="cypress" />
import { faker } from "@faker-js/faker";

beforeEach(() => {
	cy.resetDatabase();
});

describe("main page suit test", () => {
    it("test for add recommendation", () => {

        const URL_FRONT = "http://localhost:3000/";
        const URL_SERVER = "http://localhost:5000/recommendations";

        const removeVideoClicks = 6;

        const song = {
            name: faker.music.songName(),
            youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
        }

        cy.visit(URL_FRONT);
        cy.get("input[placeholder=Name]").type(song.name);
        cy.get('input[placeholder="https://youtu.be/..."').type(song.youtubeLink);

        cy.intercept("GET", URL_SERVER).as("getRecommendation");
            cy.get("button").click();
        cy.wait("@getRecommendation");

        for (let i = 0; i < removeVideoClicks; i ++) {
            cy.get("#down").click();
        }
        cy.get(`article`).should("have.length", 0);
    })
})
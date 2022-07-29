/// <reference types="cypress" />
import { faker } from "@faker-js/faker";

describe("signup suit test", () => {

    it("test for add song", () => {
        const song = {
            name: faker.music.songName(),
            youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
        }

        cy.visit("http://localhost:3000/");
        cy.get("input[placeholder=Name]").type(song.name);
        cy.get('input[placeholder="https://youtu.be/..."').type(song.youtubeLink);
        // cy.intercept("GET", "/recommendations").as("getRecommendation");
        cy.intercept("POST", "/recommendations").as("saveRecommendation");
            cy.get("button").click();
        cy.wait("@saveRecommendation");
        // cy.wait("@getRecommendation");
        cy.contains(song.name).should("be.visible");
        // cy.get("GoArrowUp").click();





        // cy.contains("IoReturnUpForwardOutline").click();
        
        // cy.url().should("equal","http://localhost:3000/");

        // cy.get("#email").type(user.email);
        // cy.get("#password").type(user.password);
        // cy.get("#submit").click();

        // cy.url().should("equal","http://localhost:3000/market");
    })

})
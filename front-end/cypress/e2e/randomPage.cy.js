/// <reference types="cypress" />

beforeEach(() => {
	cy.resetDatabase();
    cy.seedDatabase();
});

describe("top page suit test", () => {
    it("test for add recommendation", () => {
        
        const URL_FRONT = "http://localhost:3000/";
        const URL_SERVER = "http://localhost:5000/recommendations/random";
        
        cy.visit(URL_FRONT);
        cy.intercept("GET", URL_SERVER).as("getRandomRecommendations");
            cy.contains("Random").click();
        cy.wait("@getRandomRecommendations");

        cy.url().should("equal", `${URL_FRONT}random`);
    })
})
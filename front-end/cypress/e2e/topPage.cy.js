/// <reference types="cypress" />

beforeEach(() => {
	cy.resetDatabase();
    cy.seedDatabase();
});

describe("top page suit test", () => {
    it("test for add recommendation", () => {
        const URL_FRONT = "http://localhost:3000/";
        const URL_SERVER = "http://localhost:5000/recommendations/top/10";

        cy.visit(URL_FRONT);
        cy.intercept("GET", URL_SERVER).as("getTopRecommendations");
            cy.contains("Top").click();
        cy.wait("@getTopRecommendations");
        cy.url().should("equal", `${URL_FRONT}top`);
        cy.intercept("GET", URL_SERVER).as("getTopRecommendations");
            cy.get(`article:last`).within(() => {
                cy.get("#up").click();
            });
        cy.wait("@getTopRecommendations");
        cy.get(`article:last`).within(() => {
            cy.get("#down").click();
        });
        cy.get(`article`).should("have.length", 4);
    })
})
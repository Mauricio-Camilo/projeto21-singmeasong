import { prisma } from "./../../src/database.js";
import * as recommendationFactory from "./../factories/recommendationFactory.js"

export async function createScenarioOneOneRecommendation() {

    const recommendationMusic = recommendationFactory.createRecommendation();
    const recommendation = await recommendationFactory.postRecommendation(recommendationMusic); 
    return recommendation;
}

export async function createScenarioTwoMoreThan10Recommendations() {
    const recommendationQuantity = 12;
    const recommendations = [];
    for (let i = 0; i < recommendationQuantity; i ++) {
        const recommendationMusic = recommendationFactory.createRecommendation();
        const recommendation = await recommendationFactory.postRecommendation(recommendationMusic); 
        recommendations.push(recommendation);
    }
    return recommendations.reverse();
}



import { jest } from "@jest/globals";
import { CreateRecommendationData, recommendationService } from "../../src/services/recommendationsService.js";
import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";

describe("recommendation service test suite", () => {

    it("should create recommendation", async () => {

        const recommendation : CreateRecommendationData = {
            name: "Song name",
            youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y"
        }

        jest.spyOn(recommendationRepository, 'findByName').mockImplementationOnce(() : any => {
            return null
        });

        jest.spyOn(recommendationRepository, 'create').mockImplementationOnce(() : any => {});

        await recommendationService.insert(recommendation);

        expect(recommendationRepository.findByName).toBeCalled();
        expect(recommendationRepository.create).toBeCalled();
    })

    it("should not create recommendation, return error", async () => {

        const recommendation : CreateRecommendationData = {
            name: "Song name",
            youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y"
        }

        jest.spyOn(recommendationRepository, 'findByName').mockImplementationOnce(() : any => {
            return recommendation
        });

        jest.spyOn(recommendationRepository, 'create').mockImplementationOnce(() : any => {});

        const promise = recommendationService.insert(recommendation);

        expect(promise).rejects.toEqual({
            message: "Recommendations names must be unique",
            type: "conflict"
        });
    })

    
})
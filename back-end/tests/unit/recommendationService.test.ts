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

        const promise = recommendationService.insert(recommendation);

        expect(promise).rejects.toEqual({
            message: "Recommendations names must be unique",
            type: "conflict"
        });
    })

    it("should validate upvote function", async () => {
        const recommendation : CreateRecommendationData = {
            name: "Song name",
            youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y"
        }

        const id = 1;

        jest.spyOn(recommendationRepository, 'find').mockImplementationOnce(() : any => {
            return recommendation
        });

        jest.spyOn(recommendationRepository, 'updateScore').mockImplementationOnce(() : any => {
            return recommendation
        });

        await recommendationService.upvote(id);

        expect(recommendationRepository.find).toBeCalled();
        expect(recommendationRepository.updateScore).toBeCalled();
    })

    it("should fail to validate upvote function", async () => {

        const id = 1;
  
        jest.spyOn(recommendationRepository, 'find').mockImplementationOnce(() : any => {
            return null
        });

        // jest.spyOn(recommendationRepository, 'updateScore').mockImplementationOnce(() : any => {
        //     return recommendation
        // });

        const promise =  recommendationService.upvote(id);

        expect(promise).rejects.toEqual({
            message: "",
            type: "not_found"
        });

    })


    
})
package com.coffeelovers.tripservice.client;

import com.coffeelovers.tripservice.dto.genai.GenerateItineraryRequest;
import com.coffeelovers.tripservice.dto.genai.GenerateItineraryResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
public class GenAiClient {

    private final RestClient restClient;

    public GenAiClient(@Value("${genai.base-url}") String genAiBaseUrl) {
        this.restClient = RestClient.builder()
                .baseUrl(genAiBaseUrl)
                .build();
    }

    public GenerateItineraryResponse generateItinerary(GenerateItineraryRequest request) {
        return restClient.post()
                .uri("/api/v1/genai/generate")
                .body(request)
                .retrieve()
                .body(GenerateItineraryResponse.class);
    }
}

package coffeelovers.backend;

import java.util.Map;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class HelloController {

    @GetMapping("/api/home")
    public Map<String, String> getHomeMessage() {
        return Map.of(
                "title", "Welcome to AI Travel Planner",
                "message", "Create personalized travel plans with AI."
        );
    }
}
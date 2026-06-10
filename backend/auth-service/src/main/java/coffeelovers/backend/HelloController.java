package coffeelovers.backend;

import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
public class HelloController {

    @GetMapping("/api/home")
    public Map<String, String> getHomeMessage() {
        return Map.of(
                "title", "Welcome to AI Travel Planner",
                "message", "Create personalized travel plans with AI."
        );
    }
}
package coffeelovers.backend;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class HelloController {

    @GetMapping("/api/hello")
    public String hello() {
        return "Hello from backend.";
    }
}
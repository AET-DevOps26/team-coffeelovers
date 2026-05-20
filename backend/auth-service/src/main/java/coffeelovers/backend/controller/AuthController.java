package coffeelovers.backend.controller;

import coffeelovers.backend.dto.request.LoginRequest;
import coffeelovers.backend.dto.request.RegisterRequest;
import coffeelovers.backend.dto.response.AuthResponse;
import coffeelovers.backend.service.AuthServiceInterface;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthServiceInterface authService;

    public AuthController(AuthServiceInterface authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AuthResponse register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }
}
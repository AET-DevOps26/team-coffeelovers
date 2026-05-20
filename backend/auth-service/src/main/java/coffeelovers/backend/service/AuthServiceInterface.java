package coffeelovers.backend.service;

import coffeelovers.backend.dto.request.LoginRequest;
import coffeelovers.backend.dto.request.RegisterRequest;
import coffeelovers.backend.dto.response.AuthResponse;

public interface AuthServiceInterface {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);
}
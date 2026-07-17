package coffeelovers.backend.service;

import coffeelovers.backend.dto.request.LoginRequest;
import coffeelovers.backend.dto.request.RegisterRequest;
import coffeelovers.backend.dto.response.AuthResponse;
import coffeelovers.backend.dto.response.UserResponse;
import coffeelovers.backend.entity.AuthUser;
import coffeelovers.backend.repository.AuthUserRepository;
import coffeelovers.backend.security.JwtService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService implements AuthServiceInterface {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    private final AuthUserRepository authUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            AuthUserRepository authUserRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.authUserRepository = authUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Override
    public AuthResponse register(RegisterRequest request) {

        logger.info("Register request received for email: {}", request.getEmail());

        if (authUserRepository.existsByEmail(request.getEmail())) {
            logger.warn("Register failed. Email already in use: {}", request.getEmail());
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email is already in use");
        }

        if (authUserRepository.existsByUserName(request.getUsername())) {
            logger.warn("Register failed. Username already in use: {}", request.getUsername());
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username is already in use");
        }

        String encodedPassword = passwordEncoder.encode(request.getPassword());

        AuthUser user = new AuthUser(
                request.getUsername(),
                request.getEmail(),
                encodedPassword
        );

        AuthUser savedUser = authUserRepository.save(user);

        logger.info("User registered successfully. userId: {}, email: {}", savedUser.getId(), savedUser.getEmail());

        String token = jwtService.generateToken(savedUser);

        return new AuthResponse(
                token,
                UserResponse.fromEntity(savedUser)
        );
    }

    @Override
    public AuthResponse login(LoginRequest request) {

        logger.info("Login request received for email: {}", request.getEmail());

        AuthUser user = authUserRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> {
                    logger.warn("Login failed. User not found for email: {}", request.getEmail());
                    return new RuntimeException("Invalid email or password");
                });

        boolean passwordMatches = passwordEncoder.matches(
                request.getPassword(),
                user.getPasswordHash()
        );

        if (!passwordMatches) {
            logger.warn("Login failed. Invalid password for email: {}", request.getEmail());
            throw new RuntimeException("Invalid email or password");
        }

        if (!user.getIsEnabled()) {
            logger.warn("Login failed. User account disabled. userId: {}", user.getId());
            throw new RuntimeException("User account is disabled");
        }

        String token = jwtService.generateToken(user);

        logger.info("Login successful. userId: {}, email: {}", user.getId(), user.getEmail());

        return new AuthResponse(
                token,
                UserResponse.fromEntity(user)
        );
    }
}
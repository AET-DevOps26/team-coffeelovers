package coffeelovers.backend.service;

import coffeelovers.backend.dto.request.LoginRequest;
import coffeelovers.backend.dto.request.RegisterRequest;
import coffeelovers.backend.dto.response.AuthResponse;
import coffeelovers.backend.entity.AuthUser;
import coffeelovers.backend.repository.AuthUserRepository;
import coffeelovers.backend.security.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.util.ReflectionTestUtils;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private AuthUserRepository authUserRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private AuthService authService;

    private AuthUser testUser;

    @BeforeEach
    void setUp() {
        testUser = new AuthUser(
                "testuser",
                "test@example.com",
                "encoded-password"
        );

        ReflectionTestUtils.setField(testUser, "id", 1L);
        ReflectionTestUtils.setField(testUser, "createdAt", LocalDateTime.now());
    }

    @Test
    void register_shouldSucceed_withValidInput() {
        RegisterRequest request = new RegisterRequest(
                "testuser",
                "test@example.com",
                "password123"
        );

        when(authUserRepository.existsByEmail("test@example.com")).thenReturn(false);
        when(authUserRepository.existsByUserName("testuser")).thenReturn(false);
        when(passwordEncoder.encode("password123")).thenReturn("encoded-password");
        when(authUserRepository.save(any(AuthUser.class))).thenReturn(testUser);
        when(jwtService.generateToken(testUser)).thenReturn("dummy-token");

        AuthResponse response = authService.register(request);

        assertNotNull(response);
        assertEquals("dummy-token", response.getToken());
        assertNotNull(response.getUser());
        assertEquals(1L, response.getUser().getId());
        assertEquals("testuser", response.getUser().getUsername());
        assertEquals("test@example.com", response.getUser().getEmail());
        assertEquals("USER", response.getUser().getRole());
        assertTrue(response.getUser().getIsEnabled());

        verify(authUserRepository).existsByEmail("test@example.com");
        verify(authUserRepository).existsByUserName("testuser");
        verify(passwordEncoder).encode("password123");
        verify(authUserRepository).save(any(AuthUser.class));
        verify(jwtService).generateToken(testUser);
    }

    @Test
    void register_shouldFail_whenEmailAlreadyExists() {
        RegisterRequest request = new RegisterRequest(
                "testuser",
                "test@example.com",
                "password123"
        );

        when(authUserRepository.existsByEmail("test@example.com")).thenReturn(true);

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> authService.register(request)
        );

        assertEquals("Email is already in use", exception.getMessage());

        verify(authUserRepository).existsByEmail("test@example.com");
        verify(authUserRepository, never()).existsByUserName(anyString());
        verify(passwordEncoder, never()).encode(anyString());
        verify(authUserRepository, never()).save(any(AuthUser.class));
        verify(jwtService, never()).generateToken(any(AuthUser.class));
    }

    @Test
    void login_shouldSucceed_withValidCredentials() {
        LoginRequest request = new LoginRequest(
                "test@example.com",
                "password123"
        );

        when(authUserRepository.findByEmail("test@example.com"))
                .thenReturn(Optional.of(testUser));

        when(passwordEncoder.matches("password123", "encoded-password"))
                .thenReturn(true);

        when(jwtService.generateToken(testUser))
                .thenReturn("dummy-token");

        AuthResponse response = authService.login(request);

        assertNotNull(response);
        assertEquals("dummy-token", response.getToken());
        assertNotNull(response.getUser());
        assertEquals(1L, response.getUser().getId());
        assertEquals("testuser", response.getUser().getUsername());
        assertEquals("test@example.com", response.getUser().getEmail());
        assertEquals("USER", response.getUser().getRole());
        assertTrue(response.getUser().getIsEnabled());

        verify(authUserRepository).findByEmail("test@example.com");
        verify(passwordEncoder).matches("password123", "encoded-password");
        verify(jwtService).generateToken(testUser);
    }

    @Test
    void login_shouldFail_withInvalidEmail() {
        LoginRequest request = new LoginRequest(
                "wrong@example.com",
                "password123"
        );

        when(authUserRepository.findByEmail("wrong@example.com"))
                .thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> authService.login(request)
        );

        assertEquals("Invalid email or password", exception.getMessage());

        verify(authUserRepository).findByEmail("wrong@example.com");
        verify(passwordEncoder, never()).matches(anyString(), anyString());
        verify(jwtService, never()).generateToken(any(AuthUser.class));
    }

    @Test
    void login_shouldFail_withWrongPassword() {
        LoginRequest request = new LoginRequest(
                "test@example.com",
                "wrong-password"
        );

        when(authUserRepository.findByEmail("test@example.com"))
                .thenReturn(Optional.of(testUser));

        when(passwordEncoder.matches("wrong-password", "encoded-password"))
                .thenReturn(false);

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> authService.login(request)
        );

        assertEquals("Invalid email or password", exception.getMessage());

        verify(authUserRepository).findByEmail("test@example.com");
        verify(passwordEncoder).matches("wrong-password", "encoded-password");
        verify(jwtService, never()).generateToken(any(AuthUser.class));
    }
}
package coffeelovers.backend.dto.response;

import coffeelovers.backend.entity.AuthUser;

import java.time.LocalDateTime;

public class UserResponse {

    private Long id;
    private String username;
    private String email;
    private String role;
    private Boolean isEnabled;
    private LocalDateTime createdAt;

    public UserResponse() {
    }

    public UserResponse(Long id, String username, String email, String role, Boolean isEnabled, LocalDateTime createdAt) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
        this.isEnabled = isEnabled;
        this.createdAt = createdAt;
    }

    public static UserResponse fromEntity(AuthUser user) {
        return new UserResponse(
                user.getId(),
                user.getUserName(),
                user.getEmail(),
                user.getRole(),
                user.getIsEnabled(),
                user.getCreatedAt()
        );
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public Boolean getIsEnabled() {
        return isEnabled;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
package coffeelovers.common.error;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ErrorResponseTest {

    @Test
    void shouldCreateErrorResponseWithoutDetails() {
        ErrorResponse response = ErrorResponse.of(
                "NOT_FOUND",
                "Resource not found"
        );

        assertFalse(response.success());
        assertEquals("NOT_FOUND", response.code());
        assertEquals("Resource not found", response.message());
        assertTrue(response.details().isEmpty());
        assertNotNull(response.timestamp());
    }

    @Test
    void shouldCreateErrorResponseWithDetails() {
        FieldErrorResponse fieldError = new FieldErrorResponse(
                "email",
                "Email is required"
        );

        ErrorResponse response = ErrorResponse.of(
                "VALIDATION_ERROR",
                "Validation failed",
                List.of(fieldError)
        );

        assertFalse(response.success());
        assertEquals("VALIDATION_ERROR", response.code());
        assertEquals("Validation failed", response.message());
        assertEquals(1, response.details().size());
        assertEquals("email", response.details().get(0).field());
        assertEquals("Email is required", response.details().get(0).message());
        assertNotNull(response.timestamp());
    }
}
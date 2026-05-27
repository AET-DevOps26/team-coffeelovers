package coffeelovers.common.exception;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class BaseExceptionTest {

    @Test
    void shouldCreateBaseException() {
        BaseException exception = new BaseException(
                "INVALID_REQUEST",
                "Invalid request",
                400
        );

        assertEquals("INVALID_REQUEST", exception.getCode());
        assertEquals("Invalid request", exception.getMessage());
        assertEquals(400, exception.getStatusCode());
    }
}
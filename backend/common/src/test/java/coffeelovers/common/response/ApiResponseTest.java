package coffeelovers.common.response;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ApiResponseTest {

    @Test
    void shouldCreateSuccessResponseWithData() {
        ApiResponse<String> response = ApiResponse.success("test-data");

        assertTrue(response.success());
        assertEquals("Success", response.message());
        assertEquals("test-data", response.data());
    }

    @Test
    void shouldCreateSuccessResponseWithCustomMessageAndData() {
        ApiResponse<String> response = ApiResponse.success(
                "Created successfully",
                "test-data"
        );

        assertTrue(response.success());
        assertEquals("Created successfully", response.message());
        assertEquals("test-data", response.data());
    }

    @Test
    void shouldCreateSuccessResponseWithOnlyMessage() {
        ApiResponse<Void> response = ApiResponse.success("Deleted successfully", null);

        assertTrue(response.success());
        assertEquals("Deleted successfully", response.message());
        assertNull(response.data());
    }
}
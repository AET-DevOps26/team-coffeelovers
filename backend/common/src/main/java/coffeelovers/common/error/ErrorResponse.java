package coffeelovers.common.error;

import java.time.Instant;
import java.util.List;

public record ErrorResponse(
        boolean success,
        String code,
        String message,
        List<FieldErrorResponse> details,
        Instant timestamp
) {

    public static ErrorResponse of(String code, String message) {
        return new ErrorResponse(
                false,
                code,
                message,
                List.of(),
                Instant.now()
        );
    }

    public static ErrorResponse of(
            String code,
            String message,
            List<FieldErrorResponse> details
    ) {
        return new ErrorResponse(
                false,
                code,
                message,
                details,
                Instant.now()
        );
    }
}
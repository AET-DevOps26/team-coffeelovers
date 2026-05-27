package coffeelovers.common.error;

public record FieldErrorResponse(
        String field,
        String message
) {
}
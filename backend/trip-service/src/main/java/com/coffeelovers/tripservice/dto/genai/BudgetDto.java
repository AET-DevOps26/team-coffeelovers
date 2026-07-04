package com.coffeelovers.tripservice.dto.genai;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import java.math.BigDecimal;

public record BudgetDto(
        @PositiveOrZero BigDecimal amount,
        @NotBlank String currency
) {
}

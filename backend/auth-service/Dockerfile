# Stage 1: Build the auth-service
FROM gradle:8.14-jdk21 AS build

WORKDIR /app

COPY . .

RUN gradle :auth-service:bootJar --no-daemon


# Stage 2: Run the application
FROM gcr.io/distroless/java21-debian12:nonroot

WORKDIR /app

COPY --from=build /app/auth-service/build/libs/*.jar app.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]
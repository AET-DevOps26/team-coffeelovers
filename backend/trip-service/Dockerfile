FROM gradle:8.14-jdk21 AS builder

WORKDIR /app

COPY settings.gradle ./
COPY build.gradle ./
COPY common ./common
COPY backend/trip-service ./backend/trip-service

RUN gradle :backend:trip-service:bootJar --no-daemon

FROM gcr.io/distroless/java21-debian12

WORKDIR /app

COPY --from=builder /app/backend/trip-service/build/libs/*.jar app.jar

EXPOSE 8082

ENTRYPOINT ["java", "-jar", "app.jar"]
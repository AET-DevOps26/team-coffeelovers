# Stage 1: Build the application
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ARG REACT_APP_TRIP_API_URL
ENV REACT_APP_TRIP_API_URL=$REACT_APP_TRIP_API_URL
RUN npm run build
RUN npm prune --production

# Stage 2: Run the application
FROM node:22-alpine
RUN npm install -g serve
WORKDIR /app
COPY --from=build /app/build .
EXPOSE 3000
ENV NODE_ENV=production
CMD ["serve", "-s", ".", "-l", "3000"]

#BUILD STAGE
FROM eclipse-temurin:23-jdk-alpine AS build-stage
WORKDIR /app

COPY gradlew build.gradle settings.gradle ./
COPY src ./src
COPY gradle ./gradle

RUN ./gradlew bootJar
RUN ls /app/build/libs

#RUN STAGE
FROM eclipse-temurin:23-jre-alpine AS run-stage
WORKDIR /app

COPY  --from=build-stage /app/build/libs/blink-1.0.jar ./

EXPOSE 8080
CMD ["java", "-jar","blink-1.0.jar"]
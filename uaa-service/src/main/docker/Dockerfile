FROM maven:3.9.6-eclipse-temurin-17 AS builder
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests -pl uaa-service -am
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY --from=builder /app/uaa-service/target/*.jar app.jar
EXPOSE 9999
ENTRYPOINT ["java", "-jar", "app.jar"]

FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY lubase-gateway/target/*.jar app.jar
COPY lubase-gateway/src/main/resources/*.yml ./config/
EXPOSE 7573
ENTRYPOINT ["java", "-jar", "app.jar", "--spring.profiles.active=docker", "--spring.config.location=./config/"]

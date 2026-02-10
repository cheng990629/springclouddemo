FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY lubase-product/target/*.jar app.jar
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "app.jar"]

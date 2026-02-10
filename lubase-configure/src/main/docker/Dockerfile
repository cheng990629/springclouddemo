FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY lubase-configure/target/*.jar app.jar
EXPOSE 8888
ENTRYPOINT ["java", "-jar", "app.jar"]

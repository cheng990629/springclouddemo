# 多阶段构建后端服务
FROM maven:3.9-eclipse-temurin-17 AS builder
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests -f lubase-discovery/pom.xml

# 运行阶段
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY --from=builder /app/lubase-discovery/target/*.jar app.jar
EXPOSE 8761
ENTRYPOINT ["java", "-jar", "app.jar"]

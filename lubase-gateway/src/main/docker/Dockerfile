# 多阶段构建后端服务
FROM maven:3.9-eclipse-temurin-17 AS builder
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests -f lubase-gateway/pom.xml

# 运行阶段
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY --from=builder /app/lubase-gateway/target/*.jar app.jar
EXPOSE 7573
ENTRYPOINT ["java", "-jar", "app.jar"]

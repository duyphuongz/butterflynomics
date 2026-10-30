# syntax=docker/dockerfile:1

# ---- Stage 1: build jar bằng Maven + JDK 21 ----
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /workspace

# Copy pom trước để tận dụng cache layer khi chỉ sửa code
COPY pom.xml .
COPY bfn-domain/pom.xml bfn-domain/
COPY bfn-application/pom.xml bfn-application/
COPY bfn-infrastructure/pom.xml bfn-infrastructure/
COPY bfn-api/pom.xml bfn-api/

COPY bfn-domain/src bfn-domain/src
COPY bfn-application/src bfn-application/src
COPY bfn-infrastructure/src bfn-infrastructure/src
COPY bfn-api/src bfn-api/src

# Cache ~/.m2 để lần build sau không tải lại dependency.
# Bỏ qua test: test tích hợp cần Testcontainers (Docker trong Docker).
RUN --mount=type=cache,target=/root/.m2 \
    mvn -B -DskipTests package -pl bfn-api -am

# ---- Stage 2: chỉ JRE 21 + jar ----
FROM eclipse-temurin:21-jre-alpine AS runtime
WORKDIR /app

RUN addgroup -S bfn && adduser -S bfn -G bfn

COPY --from=build /workspace/bfn-api/target/bfn-api-*.jar /app/app.jar

USER bfn
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]

# Etapa 1: Construcción (Usamos Maven para compilar el código Java)
FROM maven:3.9.6-eclipse-temurin-17 AS build
COPY . /app
WORKDIR /app
RUN mvn clean package -DskipTests

# Etapa 2: Ejecución (Usamos una imagen más ligera solo para correrlo)
FROM eclipse-temurin:17-jre-alpine
# Copiamos el archivo .jar compilado de la etapa 1
COPY --from=build /app/target/calculadora-0.0.1-SNAPSHOT.jar /app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
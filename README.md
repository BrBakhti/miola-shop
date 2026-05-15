Set-Content C:\Users\ibrahim\Downloads\Maven\README.md @"
# MIOLA Shop - Backend Spring Boot

Projet Full Stack realise dans le cadre du Master MIOLA - ENSIAS
Encadrant : Pr. Khalid Nafil

## Stack Technique
- Java 17 + Spring Boot 3.2.0
- Spring Data JPA + Spring Data REST
- Spring Security + JWT
- MySQL 9 (Docker)
- Docker + Docker Compose
- Swagger UI / OpenAPI 3
- Lombok

## Lancer le projet (Docker uniquement)

### Prerequis
- Docker Desktop installe et en cours d execution

### Une seule commande
\`\`\`bash
git clone https://github.com/BrBakhti/miola-shop-backend.git
cd miola-shop-backend
docker-compose up -d --build
\`\`\`

Le build du JAR se fait automatiquement dans Docker.

## URLs

| Endpoint | URL |
|---|---|
| API Root | http://localhost:9090/api |
| Voitures | http://localhost:9090/api/voitures |
| Proprietaires | http://localhost:9090/api/proprietaires |
| Login | POST http://localhost:9090/auth/login |
| Swagger UI | http://localhost:9090/swagger-ui/index.html |

## Authentification JWT

### Login Admin
\`\`\`bash
curl -X POST http://localhost:9090/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
\`\`\`

### Login User
\`\`\`bash
curl -X POST http://localhost:9090/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"user","password":"user123"}'
\`\`\`

### Utiliser le token
\`\`\`bash
curl -X GET http://localhost:9090/voitures \
  -H "Authorization: Bearer VOTRE_TOKEN"
\`\`\`

## Comptes de test

| Username | Password | Role | Permissions |
|---|---|---|---|
| admin | admin123 | ADMIN | Lecture + Ecriture + Suppression |
| user | user123 | USER | Lecture seule |

## Structure du projet

\`\`\`
src/
├── auth/
│   ├── AuthController.java
│   ├── AuthRequest.java
│   └── AuthResponse.java
├── modele/
│   ├── Voiture.java
│   ├── Proprietaire.java
│   ├── VoitureRepo.java
│   └── ProprietaireRepo.java
├── security/
│   ├── JwtUtil.java
│   ├── JwtFilter.java
│   └── UserDetailsServiceImpl.java
├── web/
│   ├── VoitureController.java
│   └── AiController.java
├── SecurityConfig.java
└── MavenApplication.java
\`\`\`

## Docker Compose

\`\`\`yaml
services:
  springboot-app:  # port 9090
  mysqldb:         # port 3307
\`\`\`

## Verifier les containers

\`\`\`bash
docker ps
docker logs maven-springboot-app-1
\`\`\`
"@

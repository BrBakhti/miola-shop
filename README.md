Voici un README professionnel :
powershellSet-Content C:\Users\ibrahim\Downloads\Maven\README.md @"
# MIOLA Shop - Backend

<p align="center">
  <img src="https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=java"/>
  <img src="https://img.shields.io/badge/Spring%20Boot-3.2.0-green?style=for-the-badge&logo=springboot"/>
  <img src="https://img.shields.io/badge/MySQL-8.0-blue?style=for-the-badge&logo=mysql"/>
  <img src="https://img.shields.io/badge/Docker-Compose-blue?style=for-the-badge&logo=docker"/>
  <img src="https://img.shields.io/badge/JWT-Security-red?style=for-the-badge&logo=jsonwebtokens"/>
</p>

## Description

Application backend d'un magasin de voitures en ligne, developpee dans le cadre des ateliers Full Stack du Master MIOLA a l'ENSIAS.

- **Encadrant** : Pr. Khalid Nafil
- **Auteur** : Brahim Bakhti

---

## Technologies utilisees

| Technologie | Version | Role |
|---|---|---|
| Java | 17 | Langage principal |
| Spring Boot | 3.2.0 | Framework backend |
| Spring Data JPA | 3.2.0 | Persistance des donnees |
| Spring Data REST | 3.2.0 | API REST automatique |
| Spring Security | 6.2.0 | Securite et authentification |
| JWT (jjwt) | 0.12.3 | Tokens d'authentification |
| MySQL | 9.x | Base de donnees |
| Docker + Compose | latest | Containerisation |
| Swagger / OpenAPI | 2.3.0 | Documentation API |
| Lombok | 1.18.30 | Reduction du code |
| Gradle | 8.4 | Build tool |

---

## Demarrage rapide

### Prerequis
- **Docker Desktop** installe et en cours d execution
- **Git** installe

### Une seule commande

\`\`\`bash
git clone https://github.com/BrBakhti/miola-shop-backend.git
cd miola-shop-backend
docker-compose up -d --build
\`\`\`

Le JAR Spring Boot est compile automatiquement dans Docker.
Aucune installation de Java ou Gradle requise.

### Verification

\`\`\`bash
docker ps
\`\`\`

Vous devriez voir deux containers actifs :

\`\`\`
CONTAINER               IMAGE            PORTS
maven-springboot-app-1  springboot-app   0.0.0.0:9090->8082/tcp
mysqldb                 mysql            0.0.0.0:3307->3306/tcp
\`\`\`

---

## Endpoints disponibles

| Endpoint | Methode | URL | Acces |
|---|---|---|---|
| API Root | GET | http://localhost:9090/api | Public |
| Voitures | GET | http://localhost:9090/api/voitures | Public |
| Proprietaires | GET | http://localhost:9090/api/proprietaires | Public |
| Login | POST | http://localhost:9090/auth/login | Public |
| Ajouter voiture | POST | http://localhost:9090/voitures | ADMIN |
| Modifier voiture | PUT | http://localhost:9090/voitures/{id} | ADMIN |
| Supprimer voiture | DELETE | http://localhost:9090/voitures/{id} | ADMIN |
| Assistant IA | POST | http://localhost:9090/ai/chat | Authentifie |
| Swagger UI | GET | http://localhost:9090/swagger-ui/index.html | Public |

---

## Authentification JWT

### 1. Se connecter

\`\`\`bash
curl -X POST http://localhost:9090/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
\`\`\`

Reponse :

\`\`\`json
{
  "token": "eyJhbGciOiJIUzM4NCJ9...",
  "username": "admin",
  "message": "Connexion reussie !",
  "role": "ADMIN"
}
\`\`\`

### 2. Utiliser le token

\`\`\`bash
curl -X GET http://localhost:9090/voitures \
  -H "Authorization: Bearer eyJhbGciOiJIUzM4NCJ9..."
\`\`\`

---

## Comptes de test

| Username | Password | Role | Droits |
|---|---|---|---|
| admin | admin123 | ADMIN | Lecture, Ecriture, Modification, Suppression |
| user | user123 | USER | Lecture seule |

---

## Structure du projet

\`\`\`
src/main/java/org/cours/springdatarest/
│
├── auth/
│   ├── AuthController.java       # Endpoint /auth/login
│   ├── AuthRequest.java          # DTO requete login
│   └── AuthResponse.java         # DTO reponse avec token
│
├── modele/
│   ├── Voiture.java              # Entite JPA Voiture
│   ├── Proprietaire.java         # Entite JPA Proprietaire
│   ├── VoitureRepo.java          # Repository Spring Data
│   └── ProprietaireRepo.java     # Repository Spring Data
│
├── security/
│   ├── JwtUtil.java              # Generation et validation JWT
│   ├── JwtFilter.java            # Filtre HTTP JWT
│   └── UserDetailsServiceImpl.java # Chargement utilisateurs
│
├── web/
│   ├── VoitureController.java    # REST CRUD Voitures
│   └── AiController.java         # Assistant IA simulation
│
├── SecurityConfig.java           # Configuration Spring Security
└── MavenApplication.java         # Point d entree principal
\`\`\`

---

## Architecture Docker

\`\`\`
┌─────────────────────────────────────────┐
│           Docker Compose                │
│                                         │
│  ┌─────────────────┐  ┌──────────────┐  │
│  │  springboot-app  │  │   mysqldb    │  │
│  │  port: 9090      │──│  port: 3307  │  │
│  │  (Spring Boot)   │  │  (MySQL 9)   │  │
│  └─────────────────┘  └──────────────┘  │
│                                         │
└─────────────────────────────────────────┘
\`\`\`

---

## Gestion des logs

\`\`\`bash
# Logs Spring Boot
docker logs maven-springboot-app-1

# Logs MySQL
docker logs mysqldb

# Suivre les logs en temps reel
docker logs -f maven-springboot-app-1
\`\`\`

---

## Arreter le projet

\`\`\`bash
docker-compose down
\`\`\`

---

## Licence

Projet academique - Full Stack - ENSIAS - 2025/2026

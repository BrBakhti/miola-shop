# MIOLA Shop — Full Stack Spring Boot + React + Kubernetes

<p align="center">
  <img src="https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=java"/>
  <img src="https://img.shields.io/badge/Spring%20Boot-3.2.0-green?style=for-the-badge&logo=springboot"/>
  <img src="https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react"/>
  <img src="https://img.shields.io/badge/MySQL-8.0-blue?style=for-the-badge&logo=mysql"/>
  <img src="https://img.shields.io/badge/Docker-Compose-blue?style=for-the-badge&logo=docker"/>
  <img src="https://img.shields.io/badge/Kubernetes-Minikube-326CE5?style=for-the-badge&logo=kubernetes"/>
  <img src="https://img.shields.io/badge/JWT-Security-red?style=for-the-badge&logo=jsonwebtokens"/>
</p>

**Auteur :** Brahim Bakhti
**Encadrant :** Pr. Khalid Nafil — ENSIAS
**GitHub :** https://github.com/BrBakhti/miola-shop

---

## Structure du projet

\`\`\`
miola-shop/
├── src/                          # Backend Spring Boot
│   └── main/java/org/cours/springdatarest/
│       ├── auth/                 # AuthController, JWT login
│       ├── modele/               # Voiture, Proprietaire, Repos
│       ├── security/             # JwtUtil, JwtFilter, SecurityConfig
│       └── web/                  # VoitureController, AiController
├── frontend/                     # Frontend React
│   └── src/Components/
│       ├── Login.js              # Authentification JWT
│       ├── VoitureListe.js       # Liste voitures
│       ├── Voiture.js            # Ajout / modification
│       ├── AiChat.js             # Assistant IA
│       └── NavigationBar.js      # Navigation + roles
├── k8s/                          # Fichiers Kubernetes
│   ├── mysql-configMap.yaml      # Configuration DB
│   ├── mysql-secrets.yaml        # Secrets DB (base64)
│   ├── db-deployment.yaml        # PVC + MySQL + Service
│   └── app-deployment.yaml       # Spring Boot + Service
├── Dockerfile                    # Multi-stage build
├── docker-compose.yml            # Docker Compose
└── README.md
\`\`\`

---

## Option 1 — Docker Compose (le plus simple)

### Prerequis
- Docker Desktop installe et en cours d execution
- Git installe

### Lancer le projet

\`\`\`bash
git clone https://github.com/BrBakhti/miola-shop.git
cd miola-shop
docker-compose up -d --build
\`\`\`

Le JAR Spring Boot est compile automatiquement. Aucune installation de Java ou Gradle requise.

### Verifier que ca marche

\`\`\`bash
docker ps
\`\`\`

Resultat attendu :
\`\`\`
CONTAINER               PORTS
maven-springboot-app-1  0.0.0.0:9090->8082/tcp
mysqldb                 0.0.0.0:3307->3306/tcp
\`\`\`

### URLs Backend

| Endpoint | URL |
|---|---|
| API voitures | http://localhost:9090/api/voitures |
| API proprietaires | http://localhost:9090/api/proprietaires |
| Login JWT | POST http://localhost:9090/auth/login |
| Assistant IA | POST http://localhost:9090/ai/chat |
| Swagger UI | http://localhost:9090/swagger-ui/index.html |

### Tester le login

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

### Lancer le Frontend React

\`\`\`bash
cd frontend
npm install
npm start
\`\`\`

Ouvrir : http://localhost:3000

### Arreter le projet

\`\`\`bash
docker-compose down
\`\`\`

---

## Option 2 — Kubernetes avec Minikube (Lab 2)

### Prerequis
- Docker Desktop installe et en cours d execution
- Minikube installe : https://minikube.sigs.k8s.io/docs/start/
- kubectl installe : https://kubernetes.io/docs/tasks/tools/

### Architecture Kubernetes

\`\`\`
┌──────────────────────────────────────────────────────┐
│                   Minikube Node                      │
│                                                      │
│  ┌──────────────────────┐   ┌─────────────────────┐  │
│  │  springboot-crud-app  │   │       mysql         │  │
│  │  replicas: 3          │──▶│  replicas: 1        │  │
│  │  port: 8082           │   │  port: 3306         │  │
│  │  type: NodePort       │   │  clusterIP: None    │  │
│  └──────────────────────┘   └─────────────────────┘  │
│                                                      │
│  ConfigMap : db-config  (host=mysql, dbName=miola)   │
│  Secret    : mysql-secrets (username + password)     │
│  PVC       : mysql-pv-claim (1Gi persistant)         │
└──────────────────────────────────────────────────────┘
\`\`\`

### Etape 1 — Demarrer Minikube

\`\`\`bash
minikube start --driver=docker
minikube status
\`\`\`

Resultat attendu :
\`\`\`
host: Running
kubelet: Running
apiserver: Running
kubeconfig: Configured
\`\`\`

### Etape 2 — Pointer Docker vers Minikube

\`\`\`bash
# Linux / Mac
eval \$(minikube docker-env)

# Windows PowerShell
minikube docker-env | Invoke-Expression
\`\`\`

### Etape 3 — Builder l image Spring Boot

\`\`\`bash
docker build -t springboot-crud-k8s:1.0 .
docker images
\`\`\`

Vous devez voir springboot-crud-k8s avec le tag 1.0

### Etape 4 — Deployer ConfigMap et Secrets

\`\`\`bash
kubectl apply -f k8s/mysql-configMap.yaml
kubectl apply -f k8s/mysql-secrets.yaml
kubectl get configmap
kubectl get secrets
\`\`\`

### Etape 5 — Deployer MySQL

\`\`\`bash
kubectl apply -f k8s/db-deployment.yaml
kubectl get pods -w
\`\`\`

Attendez que le pod MySQL soit Running :
\`\`\`
NAME                     READY   STATUS    RESTARTS   AGE
mysql-xxx                1/1     Running   0          60s
\`\`\`

### Etape 6 — Deployer Spring Boot (3 replicas)

\`\`\`bash
kubectl apply -f k8s/app-deployment.yaml
kubectl get pods -w
\`\`\`

Attendez que les 3 pods soient Running :
\`\`\`
NAME                                      READY   STATUS    RESTARTS
mysql-xxx                                 1/1     Running   0
springboot-crud-deployment-xxx-aaa        1/1     Running   0
springboot-crud-deployment-xxx-bbb        1/1     Running   0
springboot-crud-deployment-xxx-ccc        1/1     Running   0
\`\`\`

### Etape 7 — Acceder au service

\`\`\`bash
kubectl get svc
kubectl port-forward svc/springboot-crud-svc 8082:8082
\`\`\`

Ouvrir dans le navigateur :
\`\`\`
http://localhost:8082/api/voitures
http://localhost:8082/auth/login
http://localhost:8082/swagger-ui/index.html
\`\`\`

### Etape 8 — Dashboard Minikube (optionnel)

\`\`\`bash
minikube dashboard
\`\`\`

### Commandes de debug

\`\`\`bash
kubectl get pods                          # etat des pods
kubectl get deployments                   # etat des deploiements
kubectl get svc                           # liste des services
kubectl describe pod <nom-pod>            # detail complet d un pod
kubectl logs <nom-pod>                    # logs d un pod
kubectl logs <nom-pod> --previous         # logs du crash precedent
kubectl exec -it <nom-pod> -- /bin/bash   # shell dans un pod
\`\`\`

### Nettoyer Kubernetes

\`\`\`bash
kubectl delete deployments --all
kubectl delete svc --all
kubectl delete pvc --all
minikube delete --all --purge
\`\`\`

---

## Comptes de test

| Username | Password | Role | Droits |
|---|---|---|---|
| admin | admin123 | ADMIN | Lecture, Ajout, Modification, Suppression |
| user | user123 | USER | Lecture seule |

---

## Technologies utilisees

| Couche | Technologie | Version |
|---|---|---|
| Backend | Java + Spring Boot | 17 + 3.2.0 |
| Securite | Spring Security + JWT | jjwt 0.12.3 |
| Persistance | Spring Data JPA + REST | 3.2.0 |
| Base de donnees | MySQL | 8.0 |
| Frontend | React + Bootstrap | 18 + 5 |
| Build | Gradle | 8.4 |
| Conteneurisation | Docker + Compose | latest |
| Orchestration | Kubernetes Minikube | v1.26+ |
| Documentation | Swagger OpenAPI | 2.3.0 |

---

## Labs realises

| Lab | Contenu | Resultat |
|---|---|---|
| Lab 1 | Minikube nginx, scale, NodePort, LoadBalancer, YAML, rollout | Welcome to nginx |
| Lab 2 | MySQL PVC, ConfigMap, Secrets, Spring Boot 3 replicas | API voitures operationnelle |

---

## Licence

Projet academique — Full Stack Master MIOLA — ENSIAS 2025/2026

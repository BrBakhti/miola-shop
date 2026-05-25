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

## Ateliers et Labs realises

| # | Atelier / Lab | Contenu | Statut |
|---|---|---|---|
| 1 | Atelier Full Stack 1 - Backend | JPA, Entites, MySQL, Repositories, Spring Data REST | OK |
| 2 | Atelier Full Stack 2 - Backend | Spring Security, JWT, Swagger, Controllers REST | OK |
| 3 | Atelier Full Stack 3 - Frontend | React, Bootstrap, Axios, Login, CRUD Voitures | OK |
| 4 | Atelier Docker Spring Boot MySQL | Dockerfile multi-stage, docker-compose, volumes | OK |
| 5 | Lab 1 Kubernetes | Minikube, nginx, scale, NodePort, LoadBalancer, YAML, rollout | OK |
| 6 | Lab 2 Kubernetes | MySQL PVC, ConfigMap, Secrets, Spring Boot 3 replicas | OK |

---

## Structure du projet

miola-shop/
├── src/                          
│   └── main/java/org/cours/springdatarest/
│       ├── auth/                 
│       ├── modele/              
│       ├── security/             
│       └── web/                  
├── frontend/                    
│   └── src/Components/
│       ├── Login.js             
│       ├── VoitureListe.js      
│       ├── Voiture.js           
│       ├── AiChat.js            
│       └── NavigationBar.js      
├── k8s/                          
│   ├── mysql-configMap.yaml      
│   ├── mysql-secrets.yaml      
│   ├── db-deployment.yaml        
│   └── app-deployment.yaml       
├── Dockerfile                    
├── docker-compose.yml

└── README.md

---

## Option 1 — Docker Compose

### Prerequis
- Docker Desktop installe et en cours d execution
- Git installe

### Lancer le projet

```bash
git clone https://github.com/BrBakhti/miola-shop.git
cd miola-shop
docker-compose up -d --build
```

### Verifier

```bash
docker ps
```
CONTAINER               PORTS
maven-springboot-app-1  0.0.0.0:9090->8082/tcp
mysqldb                 0.0.0.0:3307->3306/tcp


### URLs Backend

| Endpoint | URL |
|---|---|
| API voitures | http://localhost:9090/api/voitures |
| API proprietaires | http://localhost:9090/api/proprietaires |
| Login JWT | POST http://localhost:9090/auth/login |
| Swagger UI | http://localhost:9090/swagger-ui/index.html |

### Tester le login

```bash
curl -X POST http://localhost:9090/auth/login -H "Content-Type: application/json" -d "{\"username\":\"admin\",\"password\":\"admin123\"}"
```

### Lancer le Frontend

```bash
cd frontend
npm install
npm start
```

Ouvrir : http://localhost:3000

### Arreter

```bash
docker-compose down
```

---

## Option 2 — Kubernetes Minikube (Lab 2)

### Prerequis
- Docker Desktop
- Minikube : https://minikube.sigs.k8s.io/docs/start/
- kubectl : https://kubernetes.io/docs/tasks/tools/

### Architecture

+--------------------------------------------------+
|                  Minikube Node                   |
|                                                  |
|  +----------------------+  +------------------+  |
|  | springboot-crud-app  |  |     mysql        |  |
|  | replicas: 3          |->|  replicas: 1     |  |
|  | port: 8082 NodePort  |  |  port: 3306      |  |
|  +----------------------+  +------------------+  |
|                                                  |
|  ConfigMap : host=mysql, dbName=miola            |
|  Secret    : username + password base64          |
|  PVC       : mysql-pv-claim 1Gi persistant       |
+--------------------------------------------------+

### Etape 1 — Demarrer Minikube

```bash
minikube start --driver=docker
minikube status
```

Resultat attendu :

host: Running
kubelet: Running
apiserver: Running
kubeconfig: Configured

### Etape 2 — Pointer Docker vers Minikube

```bash
# Linux / Mac
eval $(minikube docker-env)

# Windows PowerShell
minikube docker-env | Invoke-Expression
```

### Etape 3 — Builder l image Spring Boot

```bash
docker build -t springboot-crud-k8s:1.0 .
docker images
```

### Etape 4 — Deployer ConfigMap et Secrets

```bash
kubectl apply -f k8s/mysql-configMap.yaml
kubectl apply -f k8s/mysql-secrets.yaml
kubectl get configmap
kubectl get secrets
```

### Etape 5 — Deployer MySQL

```bash
kubectl apply -f k8s/db-deployment.yaml
kubectl get pods -w
```

Attendez :
NAME          READY   STATUS    RESTARTS
mysql-xxx     1/1     Running   0

### Etape 7 — Acceder au service

```bash
kubectl port-forward svc/springboot-crud-svc 8082:8082
```

Ouvrir : http://localhost:8082/api/voitures
http://localhost:8082/swagger-ui/index.html 
### Etape 8 — Dashboard

```bash
minikube dashboard
```

### Commandes utiles

```bash
kubectl get pods                           # etat pods
kubectl get deployments                    # etat deploiements
kubectl get svc                            # liste services
kubectl describe pod <nom>                 # detail pod
kubectl logs <nom>                         # logs pod
kubectl exec -it <nom> -- /bin/bash        # shell pod
```

### Nettoyer

```bash
kubectl delete deployments --all
kubectl delete svc --all
kubectl delete pvc --all
minikube delete --all --purge
```

---

## Comptes de test

| Username | Password | Role | Droits |
|---|---|---|---|
| admin | admin123 | ADMIN | Lecture Ajout Modification Suppression |
| user | user123 | USER | Lecture seule |

---

## Technologies

| Couche | Technologie | Version |
|---|---|---|
| Backend | Java + Spring Boot | 17 + 3.2.0 |
| Securite | Spring Security + JWT | jjwt 0.12.3 |
| Base de donnees | MySQL | 8.0 |
| Frontend | React + Bootstrap | 18 + 5 |
| Conteneurisation | Docker + Compose | latest |
| Orchestration | Kubernetes Minikube | v1.26+ |
| Documentation | Swagger OpenAPI | 2.3.0 |

---

Projet academique — ENSIAS 2025/2026

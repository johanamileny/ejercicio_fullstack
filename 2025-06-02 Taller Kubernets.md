## 🧰 PARTE 1: Preparación del entorno

✅ **Requisitos previos**

- Tener Docker Desktop, `kubectl` y `Minikube` instalados y funcionando.
- Virtualización activada en el BIOS.
- Windows 10/11.

💻 **Comandos a ejecutar:**

```bash

minikube start --driver=docker 

minikube addons enable ingress 

kubectl get nodes 

kubectl get pods -n kube-system

```

---

## 🧱 PARTE 2: Crear un namespace y configurar la app

1. Crear el namespace:

```bash

kubectl create namespace app-fullstack

```

Nota: 

```bash

Crear una carpeta en el escritorio y abrirla con Visual Studio Code, alli crean los archivos

```

2. Crear el **ConfigMap** (`configmap.yaml`):

```yaml

apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
  namespace: app-fullstack
data:
  APP_PORT: "8080"
  PG_HOST: "postgres"

```

3. Crear el **Secret** (`secret.yaml`):

```yaml

apiVersion: v1
kind: Secret
metadata:
    name: db-secret
    namespace: app-fullstack
type: Opaque
data:
    DB_PASS: c2VjcmV0       # Base64 de 'secret'
	PG_USER: cG9zdGdyZXM=       # postgres 
	PG_PASS: c2VjcmV0cGFzcw==   # secretpass

```

📝 **Aplica ambos archivos:**

```bash

kubectl apply -f configmap.yaml
kubectl apply -f secret.yaml

```

---

## 🗃 PARTE 3: Desplegar PostgresDB 

Crear archivo `postgres.yaml` :

```yaml

apiVersion: v1 
kind: PersistentVolumeClaim 
metadata: 
	name: postgres-pvc 
	namespace: app-fullstack 
spec: 
	accessModes: 
		- ReadWriteOnce 
	resources: 
		requests: 
			storage: 1Gi 
--- 
apiVersion: apps/v1 
kind: Deployment 
metadata: 
	name: postgres 
	namespace: app-fullstack
spec: 
	selector: 
		matchLabels: 
			app: postgres 
	template: 
		metadata: 
			labels: 
				app: postgres 
		spec: 
			containers: 
				- name: postgres 
					image: postgres:15 
					ports: 
						- containerPort: 5432 
					env: 
						- name: POSTGRES_USER
							valueFrom: 
								secretKeyRef: 
									name: db-secret 
									key: PG_USER 
						- name: POSTGRES_PASSWORD 
							valueFrom: 
								secretKeyRef: 
									name: db-secret 
									key: PG_PASS 
					volumeMounts: 
						- name: postgres-pv 
							mountPath: /var/lib/postgresql/data 
				volumes: 
					- name: postgres-pv 
						persistentVolumeClaim: 
							claimName: postgres-pvc 
--- 
apiVersion: v1 
kind: Service 
metadata: 
	name: postgres 
	namespace: app-fullstack 
spec: 
	selector: 
		app: postgres 
	ports: 
		- port: 5432

```

✅ **Aplicar:**

```bash

kubectl apply -f postgres.yaml

```


---

## 🔧 PARTE 4: Backend con configuración externa

Crear archivo `backend.yaml`:

```yaml

apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
  namespace: app-fullstack
spec:
  replicas: 2
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
        - name: backend
          image: tuusuario/backend:latest
          ports:
            - containerPort: 8080
          envFrom:
            - configMapRef:
                name: app-config
            - secretRef:
                name: db-secret
---
apiVersion: v1
kind: Service
metadata:
  name: backend
  namespace: app-fullstack
spec:
  selector:
    app: backend
  ports:
    - port: 8080


```

✅ **Aplicar:**

```bash

kubectl apply -f backend.yaml

```

---

## 🌐 PARTE 5: Ingress para exponer el servicio

Crear archivo `ingress.yaml`:

```yaml

apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
  namespace: app-fullstack
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
    - host: backend.local
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: backend
                port:
                  number: 8080


```

✅ **Aplicar:**

```bash

kubectl apply -f ingress.yaml

```

🔐 **Modificar archivo `hosts` de Windows** (`C:\Windows\System32\drivers\etc\hosts`):

```txt

127.0.0.1 backend.local

```

---

## 📸 PARTE 6: Entregables del taller

📂 Archivos YAML:

- `configmap.yaml`
- `secret.yaml`
- `mongodb.yaml`
- `backend.yaml`
- `ingress.yaml`

📷 Capturas requeridas:

- Resultado de `kubectl get all -n app-demo`
- Navegador mostrando `http://backend.local` funcionando
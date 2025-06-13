# Primero el namespace
kubectl apply -f k8s/namespace.yaml

# Luego los secrets
kubectl apply -f k8s/secret.yaml

# Database resources
kubectl apply -f k8s/database/pvc.yaml
kubectl apply -f k8s/database/service.yaml
kubectl apply -f k8s/database/deployment.yaml

# Backend resources
kubectl apply -f k8s/backend/service.yaml
kubectl apply -f k8s/backend/deployment.yaml

# Frontend resources
kubectl apply -f k8s/frontend/service.yaml
kubectl apply -f k8s/frontend/deployment.yaml

# Finally, the ingress
kubectl apply -f k8s/ingress.yaml

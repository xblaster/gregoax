@echo off
echo Building Docker image...
docker build -t xblaster/gregoax-website:latest .

echo Pushing to registry...
docker push xblaster/gregoax-website:latest

echo Applying Kubernetes manifests...
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/ingress.yaml

echo Deployment to Kubernetes complete!
echo Checking deployment status...
kubectl get pods -n gregoax
pause
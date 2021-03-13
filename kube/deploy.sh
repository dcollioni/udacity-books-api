#! /bin/bash

# first deploy
# kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.44.0/deploy/static/provider/aws/deploy.yaml
# kubectl apply -f deploy-tls-termination.yaml
# kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

kubectl apply -f ./kube
./kube/deploy-secret.sh
./kube/deploy-autoscale.sh

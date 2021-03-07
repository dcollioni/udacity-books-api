#! /bin/bash

kubectl delete secret udacity-books-api-secret
kubectl create secret generic udacity-books-api-secret --from-env-file=.env

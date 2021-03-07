#! /bin/bash

kubectl autoscale deployment udacity-books-api --name udacity-books-api-hpa --cpu-percent=50 --min=1 --max=2

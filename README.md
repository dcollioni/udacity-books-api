# udacity-books-api

## run locally
1. create a `.env` file in the root with the following:
  ```
  MONGODB_URI="mongodb+srv://user:password@host/db"
  ```
2. run `npm install`
3. run `npm run dev`

## run tests
1. run `npm run test`

## deploy to kube
1. run `kubectl apply -f ./kube`
2. run `./deploy-secret.sh`
2. run `./deploy-autoscale.sh`

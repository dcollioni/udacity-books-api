# udacity-books-api

## run locally
- create a `.env` file in the root with the following:
  ```
  MONGODB_URI=...
  AWS_REGION=...
  AWS_PROFILE=...
  AWS_BUCKET=...
  AWS_ACCESS_KEY_ID=...
  AWS_SECRET_ACCESS_KEY=...
  ```
- run `npm install`
- run `npm run dev`

## run tests
- run `npm run test`

## deploy to kube
- run `./kube/deploy.sh`

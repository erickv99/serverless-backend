# serverless-backend

## commands

### create lambda

`sls create --template aws-nodejs-typescript --path createProduct`

# product service urls

## products

https://ej64rpzdqi.execute-api.us-east-1.amazonaws.com/dev/products

## products by id

https://ej64rpzdqi.execute-api.us-east-1.amazonaws.com/dev/products/{id}

https://ej64rpzdqi.execute-api.us-east-1.amazonaws.com/dev/products/18b3113a8-b9a3-48e4-83fd-b14ed7305c0a

# Module 4: Integration with NoSQL Database

## Task 4.1

Inside /seed folder

```
products.sh
```

```
stocks.sh
```

## Task 4.2

Here is the FE calling the API with dynamo db integrated

https://serverless-frontend-1.s3.amazonaws.com/index.html

## Task 4.3

The following command can be used to test the createProduct function locally

```
sls invoke local -f createProduct --data '{"headers":{"Content Type": "application/json"},"body": {"title":"Chair", "description":"good chair", "price": 100, "count":10}}'
```

## task 4.4

https://github.com/erickv99/serverless-backend/pull/2

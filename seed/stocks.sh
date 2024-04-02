#!/bin/bash

aws dynamodb put-item --table-name Stocks --item '{"product_id":{"S":"1dfea959-8b9b-428e-9ee1-3f2e95dfa979"}, "count":{"N":"20"}}'
aws dynamodb put-item --table-name Stocks --item '{"product_id":{"S":"1dfea959-8b9b-428e-9ee1-3f2e95dfa980"}, "count":{"N":"15"}}'
aws dynamodb put-item --table-name Stocks --item '{"product_id":{"S":"1dfea959-8b9b-428e-9ee1-3f2e95dfa981"}, "count":{"N":"10"}}'
aws dynamodb put-item --table-name Stocks --item '{"product_id":{"S":"1dfea959-8b9b-428e-9ee1-3f2e95dfa982"}, "count":{"N":"5"}}'
aws dynamodb put-item --table-name Stocks --item '{"product_id":{"S":"1dfea959-8b9b-428e-9ee1-3f2e95dfa983"}, "count":{"N":"25"}}'
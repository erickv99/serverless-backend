#!/bin/bash

aws dynamodb put-item --table-name Products --item '{"id":{"S":"1dfea959-8b9b-428e-9ee1-3f2e95dfa979"}, "title":{"S":"Vase"},"description":{"S":"white vase"}, "price":{"N":"25"}}' --region us-east-1
aws dynamodb put-item --table-name Products --item '{"id":{"S":"1dfea959-8b9b-428e-9ee1-3f2e95dfa980"}, "title":{"S":"Chair"},"description":{"S":"wooden chair"}, "price":{"N":"60"}}' --region us-east-1
aws dynamodb put-item --table-name Products --item '{"id":{"S":"1dfea959-8b9b-428e-9ee1-3f2e95dfa981"}, "title":{"S":"Lamp"},"description":{"S":"bedside lamp"}, "price":{"N":"30"}}' --region us-east-1
aws dynamodb put-item --table-name Products --item '{"id":{"S":"1dfea959-8b9b-428e-9ee1-3f2e95dfa982"}, "title":{"S":"Table"},"description":{"S":"round table"}, "price":{"N":"120"}}' --region us-east-1
aws dynamodb put-item --table-name Products --item '{"id":{"S":"1dfea959-8b9b-428e-9ee1-3f2e95dfa983"}, "title":{"S":"Carpet"},"description":{"S":"blue carpet"}, "price":{"N":"45"}}' --region us-east-1

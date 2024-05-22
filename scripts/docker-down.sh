#!/bin/bash

if [ "$NODE_ENV" = "production" ]; then
  DOCKER_PROJECT="uwajudge-prod"
else
  DOCKER_PROJECT="uwajudge-dev"
fi

docker compose -p $DOCKER_PROJECT down
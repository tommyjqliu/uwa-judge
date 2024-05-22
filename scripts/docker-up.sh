#!/bin/bash

if [ "$NODE_ENV" = "production" ]; then
  DOCKER_PROJECT="uwajudge-prod"
  PROFILE_FLAG="--profile prod"
else
  DOCKER_PROJECT="uwajudge-dev"
  PROFILE_FLAG="--profile dev"
fi

docker compose -p $DOCKER_PROJECT $PROFILE_FLAG up -d --pull

export DOCKER_PROJECT

sh scripts/docker-setup.sh
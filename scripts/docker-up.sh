#!/bin/bash

if [ "$ENV" = "PROD" ]; then
  DOCKER_PROJECT="uwajudge-prod"
  PROFILE_FLAG=""
else
  DOCKER_PROJECT="uwajudge-dev"
  PROFILE_FLAG="--profile dev"
fi

touch password.judgehost
docker compose -p $DOCKER_PROJECT $PROFILE_FLAG up -d

export DOCKER_PROJECT

sh scripts/docker-setup.sh
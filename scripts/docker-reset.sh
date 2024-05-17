#!/bin/bash

if [ "$ENV" = "PROD" ]; then
  DOCKER_PROJECT="uwajudge-prod"
else
  DOCKER_PROJECT="uwajudge-dev"
fi

docker compose -p $DOCKER_PROJECT down
sudo rm -rf .mariadb
rm -rf password.admin
rm -rf password.judgehost
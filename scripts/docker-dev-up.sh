#!/bin/bash

touch password.judgehost
docker compose -f docker-compose.dev.yml -p uwajudge-dev up -d

export DOCKER_PROJECT="uwajudge-dev"

sh scripts/docker-setup.sh
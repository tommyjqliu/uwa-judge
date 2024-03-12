#!/bin/bash
touch restapi.secret
docker-compose up -d
sh scripts/get-secrets.sh

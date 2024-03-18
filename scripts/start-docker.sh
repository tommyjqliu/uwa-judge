#!/bin/bash
touch password.judgehost
docker-compose up -d
sh scripts/get-secrets.sh

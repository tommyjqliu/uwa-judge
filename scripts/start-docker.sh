#!/bin/bash
touch password.judgehost
docker-compose -f docker-compose.dev.yml up -d
sh scripts/get-secrets.sh

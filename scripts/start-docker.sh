#!/bin/bash
cd /app/nextjs
touch password.judgehost
docker-compose up -d
sh scripts/get-secrets.sh

#!/bin/bash
docker compose -p uwajudge-dev down
sudo rm -rf .mariadb
rm -rf password.admin
rm -rf password.judgehost
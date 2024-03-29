#!/bin/bash
docker-compose -p uwajudge-dev down
sudo rm -rf .mariadb
rm password.admin
rm password.judgehost
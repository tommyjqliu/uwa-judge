#!/bin/bash

. ./.env
temp_db_name="temp_uwajudge_dump"

docker compose exec postgres createdb -U ${POSTGRES_USER} $temp_db_name
export DATABASE_URL=$(echo $DATABASE_URL | sed "s/uwajudgedb/$temp_db_name/")
docker compose exec webapp sh -c "cd /app && export NODE_ENV=production && export DATABASE_URL=$DATABASE_URL && npx prisma migrate reset --force"
docker compose exec postgres pg_dump -U ${POSTGRES_USER} -d $temp_db_name -F c -b -v -f /var/lib/postgresql/dump/initial_data.dump
cp temp/.postgres-dump/initial_data.dump webapp/prisma/initial_data.dump
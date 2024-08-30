#!/bin/bash

. ./.env

# Define number of retries and wait time
MAX_TRIES=10
RETRY_WAIT=5

# Loop for connecting to database
for i in $(seq 1 $MAX_TRIES); do
    output=$(docker compose exec postgres pg_isready 2>&1)
    result=$?
    if [ "$result" -eq 0 ]; then
        break
    fi
    echo "$output" "($result)"
    echo "Waiting for DB to start ($i/$MAX_TRIES attempts)..."
    sleep $RETRY_WAIT
done

# Check if connection successful
if [ "$result" -eq 0 ]; then
    echo "PostgresDB connection successful, proceeding with database setup..."
    sleep 1
    npx prisma migrate reset --force
else
    echo "ERROR: Could not connect to PostgresDB after $MAX_TRIES retries. Aborting."
    exit 1
fi

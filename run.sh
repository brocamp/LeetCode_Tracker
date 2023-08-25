#!/bin/bash

# Run Docker command and execute npm commands inside Docker shell
docker-compose up --build --no-recreate -d
docker exec -it frontend sh -c "npm i && npm run dev"

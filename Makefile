CURRENT_DIR=$(patsubst %/,%,$(dir $(realpath $(firstword $(MAKEFILE_LIST)))))
ROOT_DIR=$(CURRENT_DIR)
CURRENT_USER=
DOCKER_NAME=frontend
DOCKER_COMPOSE=docker-compose
DOCKER_EXEC_TOOLS_APP=$(CURRENT_USER) docker exec -it $(DOCKER_NAME) sh
NODE_INSTALL="npm i"
SERVER_RUN="npm run dev"


.PHONY: build install dev up start first stop restart clear


build:
 $(DOCKER_COMPOSE) up --build --no-recreate -d


install:
 $(DOCKER_EXEC_TOOLS_APP) -c $(NODE_INSTALL)


dev:
 $(DOCKER_EXEC_TOOLS_APP) -c $(SERVER_RUN)


up:
 $(DOCKER_COMPOSE) up -d


start: up dev
// this will up the docker env and run the npm run dev it to


first: build install dev
// this will build the env, up it and run the npm install and then run npm run dev it to


stop: $(ROOT_DIR)/docker-compose.yml
 $(DOCKER_COMPOSE) kill || true
 $(DOCKER_COMPOSE) rm --force || true


restart: stop start dev


clear: stop $(ROOT_DIR)/docker-compose.yml
 $(DOCKER_COMPOSE) down -v --remove-orphans || true

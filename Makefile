# Makefile

# Targets
.PHONY: prod dev 

prod:
	docker compose -f docker-compose-prod.yaml up --build -d 

dev:
	docker compose -f docker-compose-dev.yaml up --build -d

down-dev:
	docker compose -f docker-compose-dev.yaml down

down-prod:
	docker compose -f docker-compose-prod.yaml down
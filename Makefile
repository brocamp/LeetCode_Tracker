# Makefile

# Variables
BACKEND_DIR = backend
FRONTEND_DIR = frontend
PROJECT= LeetCode Checker Server

# Targets
.PHONY: server client build

server: ;@echo "Starting ${PROJECT}....."; \
	cd $(BACKEND_DIR) && npm start

client:
	cd $(FRONTEND_DIR) && npm run dev

build:
	docker-compose build

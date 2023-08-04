.PHONY: help

docker-compose=docker-compose -f docker-compose.yml

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

start: stop build up copy_vendor _finish ## Starts containers with build
fast: stop up _finish ## Attempts to start existing containers

tests: linting tests_unit tests_e2e ## Executes all tests

up:
	$(docker-compose) up -d

build:
	$(docker-compose) build

stop: ## Stops containers and removes network
	$(docker-compose) down -v --remove-orphans
	docker network prune -f

linting: ## Executes linting in the way like CI&CD should do it
	$(docker-compose) run --rm public_booking_linting

linting_fix: ## Run linter with --fix flag
	$(docker-compose) run --rm public_booking_linting npm run lint

tests_unit: ## Executes unit tests in the way like CI&CD should do it
	$(docker-compose) run --rm public_booking_tests_unit

tests_e2e: ## Executes e2e tests in the way like CI&CD should do it
	$(docker-compose) run --rm public_booking_tests_e2e

tests_e2e_watch: ## Executes e2e tests with --watch flag
	$(docker-compose) run --rm public_booking_tests_e2e npm run test:e2e:watch

tests_unit_watch: ## Executes unit tests with volume binding and watch mode (needs `tests_unit` command to be executed firstly)
	$(docker-compose) run --rm public_booking_tests_unit npm run test:watch

_finish:
	@echo "----------------------------------------------------------------------------"
	@echo "Client is running in watch mode with data mock under: http://localhost:4200/"
	@echo "----------------------------------------------------------------------------"

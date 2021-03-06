DOCKER_IMG=wesovilabs/graphql-ninja:local
DOCKER_RUN=docker-compose run -p7000:7000 code
DOCKER_CLEAN=docker-compose down -v --rmi local
DOCKER_BUILD=docker build -t=${DOCKER_IMG} .
install:
	yarn install;
build:
	$(DOCKER_BUILD)
run: build ;
	$(DOCKER_RUN)
clean:
	rm -rf node_modules;
	$(DOCKER_CLEAN)
local:
	APP_CONFIG_DIR=./config NODE_ENV=local npm run dev

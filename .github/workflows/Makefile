# 1) start devContainer.
# 2) make -f .github/workflows/Makefile all
.PHONY: all
all: build run

.PHONY: build
build:
	docker build -t express-app -f .github/workflows/Dockerfile .

.PHONY: run
run:
	docker run -it --rm -p 3001:80 \
		-e DB_HOST=db -e DB_USER=root -e DB_PASSWORD=passwd -e DB_NAME=sample_production \
		--network express-app_devcontainer_default express-app

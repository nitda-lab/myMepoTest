FROM mcr.microsoft.com/devcontainers/typescript-node:20-bookworm

RUN apt-get update && apt-get install -y --no-install-recommends \
    net-tools postgresql-client && \
    apt-get clean

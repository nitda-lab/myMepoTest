FROM mcr.microsoft.com/devcontainers/typescript-node:20-bookworm

RUN apt-get update && apt-get install -y --no-install-recommends \
    nginx postgresql-client && \
    apt-get clean
COPY .github/workflows/http_proxy.conf /etc/nginx/sites-available/default
RUN sed -ie 's|access_log .* main;|access_log /dev/stdout main;|' /etc/nginx/nginx.conf
RUN sed -ie 's|error_log .* warn;|error_log /dev/stderr warn;|' /etc/nginx/nginx.conf

WORKDIR /app
COPY . .
RUN npm install

ENV NODE_ENV production
ENV APP_PORT 3000

EXPOSE 80
ENTRYPOINT ["/app/.github/workflows/bootstrap.sh"]

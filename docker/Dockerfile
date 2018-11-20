FROM richarvey/nginx-php-fpm:latest

ENV APP_DIR /app

ARG ROOT_DIR=${APP_DIR}

VOLUME ${ROOT_DIR}

WORKDIR ${ROOT_DIR}

COPY dist notes/
COPY api api/
COPY docker/default.conf /etc/nginx/sites-available/default.conf

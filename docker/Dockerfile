FROM richarvey/nginx-php-fpm:latest

COPY docker/nginx /etc/nginx/sites-available/

WORKDIR /var/www/brandboom

COPY dist notes/
COPY api api/

RUN chown nginx:nginx -R *

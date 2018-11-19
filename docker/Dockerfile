FROM richarvey/nginx-php-fpm:latest

COPY docker/nginx /etc/nginx/sites-available/

WORKDIR /var/www/brandboom

COPY dist notes/
COPY api api/

RUN chown nginx:nginx -R *

#RUN mkdir -p touch api/storage/logs && touch api/storage/logs/laravel.log && chmod 766 api/storage/logs/laravel.log

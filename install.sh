#!/usr/bin/env bash

root_dir=${ROOT_DIR:-/app}

api_dir=`pwd`/api
log_dir=${api_dir}/storage/logs
lock_file=${api_dir}/composer.lock
db_file=${api_dir}/database/database.sqlite

if [[ ! -f .env ]]; then
    touch .env

    echo "VUE_APP_PORT=8585" >> .env
    echo "VUE_APP_URL=http://localhost" >> .env
fi

yarn install

if [[ -f "${lock_file}" ]]; then
    composer --working-dir=${api_dir} update
else
    composer --working-dir=${api_dir}  install
fi

if [[ ! -f "${db_file}" ]]; then
    touch "${db_file}"
fi

if [[ ! -d "${log_dir}" ]]; then
    sudo mkdir -p "${log_dir}"
fi

touch "${log_dir}/laravel.log"

sudo chmod -R 777 ${api_dir}/storage

sudo chmod 766 ${db_file}

php ${api_dir}/artisan migrate --force

php ${api_dir}/artisan cache:clear

php ${api_dir}/artisan config:clear

cat << NGINX > `pwd`/docker/default.conf
server {
    listen 80;
    server_name localhost;
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";
    charset utf-8;
    error_page 404 /index.php;
    location / {
        root ${root_dir}/notes;
        index index.html;
        try_files \$uri \$uri/ /index.html?\$query_string;
    }
    location /api {
        root ${root_dir}/api/public;
        index index.php;
        try_files \$uri \$uri/ /index.php?\$query_string;
    }
    location ~ \.php$ {
        root ${root_dir}/api/public;
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass unix:/var/run/php-fpm.sock;
        fastcgi_param SCRIPT_FILENAME \$document_root\$fastcgi_script_name;
        fastcgi_index index.php;
        include fastcgi_params;
    }
}
NGINX

yarn docker:full

rm `pwd`/docker/default.conf

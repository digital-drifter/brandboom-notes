# Notes App Demo

## Built Using

#### Frontend

* [Vue.js](https://vuejs.org/)
* [Vuetify](https://vuetifyjs.com/en/)
* [Vuex](https://vuex.vuejs.org/)
* [Vue Router](https://router.vuejs.org/)

#### Backend

* [Laravel](https://laravel.com/)
* [Nginx](https://www.nginx.com/)
* [SQLite](https://www.sqlite.org/index.html)

## Quick Start

```bash
# Run the following command from a terminal

docker run -p 8585:80 -d digitaldrifter/notes-app-demo:latest
```

Open in browser: http://localhost:8585/

Get the Docker image: https://hub.docker.com/r/digitaldrifter/notes-app-demo/

## Running Locally
```bash
# Clone this repository

git clone https://github.com/digital-drifter/notes-app-demo

cd notes-app-demo
```

```dotenv
# Add to .env

VUE_APP_PORT=8585
VUE_APP_URL=http://localhost
```

```bash
# Run the install script
./install.sh
```

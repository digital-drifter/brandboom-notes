# Notes App Demo

## About

* Frontend

Built using [Vue.js](https://vuejs.org/), [Vuetify](https://vuetifyjs.com/en/), [Vuex](https://vuex.vuejs.org/), [Vue Router](https://router.vuejs.org/),

## Quick Start

```bash
# Run using docker

docker run -p 8585:80 -d digitaldrifter/notes-app-demo:latest
```

## Running Locally
```bash
# Clone this repository

git clone https://github.com/digital-drifter/notes-app-demo

cd notes-app-demo
```

```bash
# Install NPM dependencies

yarn install
```

```bash
# Install Laravel dependencies

cd api

composer install
```

```dotenv
# Add to .env

VUE_APP_PORT=8585
VUE_APP_URL=http://localhost
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

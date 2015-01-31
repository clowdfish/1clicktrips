1ClickTrips
===========

The business traveler platform offering end to end trip management.

## Project structure and content

<ul>
<li><b>app</b>: server side code</li>
<li><b>config</b>: server side configuration files</li>
<li>deploy.sh: deployment script to setup server environment</li>
<li><b>frontend</b>: client side code</li>
<li>package.json: typical npm package file</li>
<li>server.js: starting point of the application</li>
<li>setup.sh: is executed on the server for preparing the Node application</li>
<li><b>test</b>: test files for server</li>
</ul>

## Installation
### Backend
Just install the npm modules to be ready to go:
```
$ npm install && bower install && tsd reinstall
```

### Frontend
Go to the `/frontend` directory and install all npm and bower modules.
```
$ cd ./frontend
$ npm install && bower install
```
To start the frontend development process, start gulp in `/frontend`.
```
$ gulp live
```
A watch process is started with a thin server layer delivering the frontend to the client. The process also includes a proxy that redirects all requests for `/api/` to localhost:8080 which is answered by the `server.js` file (once you started that server). On the production server a .htaccess file will be responsible for that part.


## Server requirements

### Directory structure
The application is deployed to `~/server/dev` (add "dev" as parameter) or `~/server/build` (add "prod" as parameter), so make sure those folders exist. 

The Express.js server is configured to serve its static files from `/var/www`.
So you either put the static files (e.g. html, images, js, css) directly into that directory or you create a symlink that redirects `/var/www` to the proper folder with the static content.

Express.js listens on port 8080, so make sure that no other application is listening on the same port when the application starts. 

## Testing
Testing is done with Karma as test runner and Jasmine.js as testing framework. Additionally Sinon.js is used for mocking functionality.
All tests must be contained in `./test` (from now on called `$TEST_ROOT`) and follow the naming convention: `*.spec.js`
Within `$TEST_ROOT` is the bootstrap.js that is defining the paths to ALL files we need for running our tests. If you do not add the paths to your dependencies in here, the tests will fail. 
This file is responsible for finding and listing all existing tests. 

## REST API

### Guidelines
The REST API follows some general guidelines in order to be as consistent, self-explanatory, simple, and clear as possible.

#### Methods

- `GET` should not mutate the server state in any way (besides logging or caching).
- `POST`, `PUT`, and `DELETE` indicate the server state may be changed.

#### Status codes

- `200` means that the request was successfully processed and the response body contains the result.
- `400` means that the client sent a malformed request, such as malformed or invalid JSON data that failed a validity check.
- `401` means that the client is not authenticated.
- `403` means that the requested resource could not be served because it is forbidden.
- `404` means that the client asked for a resource that is not available.
- `500` indicates that an internal error has occurred in the processing of the request.

#### Documentation
The REST API documentation is done with [Swagger 2.0](http://swagger.io/) and can be found [here](http://swagger.homeunix.com/ui/).

The documentation for Swagger 2.0 can be found [here](https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md).


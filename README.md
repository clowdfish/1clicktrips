trip-to-go
==========

The business traveler platform offering end to end trip management.

## Project structure and content

<ul>
<li>app: server side code</li>
<li>config: server side configuration files</li>
<li>deploy.sh: deployment script to setup server environment</li>
<li>package.json: typical npm package file</li>
<li>server.js: starting point of the application</li>
<li>setup.sh: is executed on the server for preparing the Node application</li>
</ul>

## Server requirements

### Directory structure
The application is deployed to ~/server/dev (add "dev" as parameter) or ~/server/build (add "prod" as parameter), so make sure those folders exist. 

The Express.js server is configured to serve its static files from /var/www.
So you either put the static files (e.g. html, images, js, css) directly into that directory or you create a symlink that redirects /var/www to the proper folder with the static content.

Express.js listens on port 8080, so make sure that no other application is listening on the same port when the application starts. 

## Testing
Testing is done with Karma as test runner and Jasmine.js as testing framework. Additionally Sinon.js is used for mocking functionality.
All tests must be contained in ./test (from now on called $TEST_ROOT) and follow the naming convention: `*.spec.js`
Within $TEST_ROOT is the bootstrap.js that is defining the paths to ALL files we need for running our tests. If you do not add the paths to your dependencies in here, the tests will fail. 
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

### Resources

The resource definitions lists all resources provided by the REST API.
Each resource definition consists of at least one route.
A route contains a route definition, a description, a parameter definition, a request body definition, and a response definition.
A response can be either successful or an error.  A response definition contains the expected error code first and the response body afterwards, if any.

#### Search

|                            | Details                                                           |
| -------------------------- | ---------------------------------------------------------------   |
| Route                      | `GET` `/api/search?q={:query}`                                    |
| Description                | Start search with the given parameters.                           |
|                            | The query format is defined in [`<query>`](#search)               |
| Parameters                 | `<string>` `query`                                                |
| Request body               | -                                                                 |
| Response (success)         | `200`, [`<search-results>`](#search-1)                            |
| Response (unauthenticated) | `401`, [`<error>`](#error)                                        |
| Response (server error)    | `500`, [`<error>`](#error)                                        |

#### Language

|                            | Details                                                           |
| -------------------------- | ---------------------------------------------------------------   |
| Route                      | `GET` `/api/lang`                                                 |
| Description                | Retrieve available languages.                                     |
| Parameters                 | -                                                                 |
| Request body               | -                                                                 |
| Response (success)         | `200`, [`<languages>`](#languages-1)                                    |
| Response (unauthenticated) | `400`, [`<error>`](#error)                                        |
| Response (server error)    | `500`, [`<error>`](#error)                                        |

### Data format definitions

#### Search

##### Format

```
<query> ::= { "origin" : <location>,
              "appointments" : [ <appointment> ],
              "preferences" : [ <preference> ] }
<appointment> ::= { "description" : <string>,
                    "location" : <location>,
                    "start" : <rfc-3339-date>,
                    "end" : <rfc-3339-date> }
<location> ::= { "latitude" : <double>,
                 "longitude" : <double> }
<preference> ::= { "key" : <string>,
                   "value" : <string> }
```

##### Example `<query>`

```JSON
{
"origin": { 
  "latitude": 41.40338, 
  "longitude": 2.17403 
},
"appointments": [
  {
    "description": "",
    "location": { 
      "latitude": 49.40338, 
      "longitude": 9.17403 
    },
    "start": "2012-10-22T11:55:00Z",
    "end": "2015-10-23T11:55:00Z"
  }
],  
"preferences": {}
}
```
#### Language

##### Format

```
<languages> ::= [ 
  { 
    "lang" : <string>,
    "iso" : <string>,
    "name" : <string> 
  }
]
```

##### Example

```JSON
[
  {
    'lang' : 'de',
    'iso': 'de-DE',
    'name': 'Deutsch'
  },
  {
    'lang' : 'en',
    'iso' : 'en-US',
    'name' : 'English's
  }
]
```

#### Error

##### Format

```
<error> ::= <string>
```

##### Example

```JSON
"status.user.error.server.failure"
```
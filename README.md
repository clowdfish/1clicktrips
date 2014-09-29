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
|                            | The query format is defined in [`<query>`](#search-1)             |
| Parameters                 | `<string>` `<query>`                                              |
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
| Response (success)         | `200`, [`<languages>`](#language-1)                               |
| Response (unauthenticated) | `400`, [`<error>`](#error)                                        |
| Response (server error)    | `500`, [`<error>`](#error)                                        |

#### Profile

|                            | Details                                                           |
| -------------------------- | ---------------------------------------------------------------   |
| Route                      | `GET` `/profile/details`                                          |
| Description                | Retrieve profile information for user.                            |
| Parameters                 | -                                                                 |
| Request body               | -                                                                 |
| Response (success)         | `200`, [`<profile>`](#profile-1)                                  |
| Response (unauthenticated) | `400`, [`<error>`](#error)                                        |
| Response (server error)    | `500`, [`<error>`](#error)                                        |

|                            | Details                                                           |
| -------------------------- | ---------------------------------------------------------------   |
| Route                      | `POST` `/profile/details`                                         |
| Description                | Push profile information for user.                                |
| Parameters                 | -                                                                 |
| Request body               | [`<profile>`](#profile-1)                                         |
| Response (success)         | `200`, [`<settings>`](#settings)                                  |
| Response (unauthenticated) | `400`, [`<error>`](#error)                                        |
| Response (server error)    | `500`, [`<error>`](#error)                                        |

#### Preferences

|                            | Details                                                           |
| -------------------------- | ---------------------------------------------------------------   |
| Route                      | `GET` `/profile/preferences`                                      |
| Description                | Retrieve preferences information for user.                        |
| Parameters                 | -                                                                 |
| Request body               | -                                                                 |
| Response (success)         | `200`, [`<preferences>`](#preferences-1)                          |
| Response (unauthenticated) | `400`, [`<error>`](#error)                                        |
| Response (server error)    | `500`, [`<error>`](#error)                                        |

|                            | Details                                                           |
| -------------------------- | ---------------------------------------------------------------   |
| Route                      | `POST` `/profile/preferences`                                     |
| Description                | Push preferences information for user.                            |
| Parameters                 | -                                                                 |
| Request body               | [`<preferences>`](#preferences-1)                                 |
| Response (success)         | `200`, [`<settings>`](#settings)                                  |
| Response (unauthenticated) | `400`, [`<error>`](#error)                                        |
| Response (server error)    | `500`, [`<error>`](#error)                                        |

#### Privacy

|                            | Details                                                           |
| -------------------------- | ---------------------------------------------------------------   |
| Route                      | `GET` `/profile/privacy`                                          |
| Description                | Retrieve privacy information for user.                            |
| Parameters                 | -                                                                 |
| Request body               | -                                                                 |
| Response (success)         | `200`, [`<privacy>`](#privacy-1)                                  |
| Response (unauthenticated) | `400`, [`<error>`](#error)                                        |
| Response (server error)    | `500`, [`<error>`](#error)                                        |

|                            | Details                                                           |
| -------------------------- | ---------------------------------------------------------------   |
| Route                      | `POST` `/profile/privacy`                                         |
| Description                | Push privacy information for user.                                |
| Parameters                 | -                                                                 |
| Request body               | [`<privacy>`](#privacy-1)                                         |
| Response (success)         | `200`, [`<settings>`](#settings)                                  |
| Response (unauthenticated) | `400`, [`<error>`](#error)                                        |
| Response (server error)    | `500`, [`<error>`](#error)                                        |

#### Authentication

|                            | Details                                                           |
| -------------------------- | ---------------------------------------------------------------   |
| Route                      | `POST` `/api/signup`                                              |
| Description                | Register and authenticate user and retrieve auth token.           |
| Parameters                 | -                                                                 |
| Request body               | -                                                                 |
| Response (success)         | `200`, [`<authentication>`](#authentication-1)                    |
| Response (unauthenticated) | `400`, [`<error>`](#error)                                        |

|                            | Details                                                           |
| -------------------------- | ---------------------------------------------------------------   |
| Route                      | `POST` `/api/login`                                               |
| Description                | Authenticate user and retrieve auth token.                        |
| Parameters                 | -                                                                 |
| Request body               | -                                                                 |
| Response (success)         | `200`, [`<authentication>`](#authentication-1)                    |
| Response (unauthenticated) | `400`, [`<error>`](#error)                                        |

|                            | Details                                                           |
| -------------------------- | ---------------------------------------------------------------   |
| Route                      | `GET` `/api/logout`                                               |
| Description                | Delete user session on server side.                               |
| Parameters                 | -                                                                 |
| Request body               | -                                                                 |
| Response (success)         | `200`                                                             |
| Response (unauthenticated) | `400`, [`<error>`](#error)                                        |

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


```
<search-results> ::= { "to be defined" }
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

##### Example `<search-results>`

```JSON
"to be defined"
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
    "lang" : "de",
    "iso": "de-DE",
    "name": "Deutsch"
  },
  {
    "lang" : "en",
    "iso" : "en-US",
    "name" : "English"
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

#### Settings

##### Format

```
<settings> ::= {
  "_id" : <string>,
  "user" : <string>,
  "profile" : <profile>,
  "preferences" : <preferences>,
  "privacy" : <privacy>
}
```

##### Example

```JSON
{
  "_id": "5412e5a938151d1dfce29cd5",
  "user": "5406c10efc92f4922eb26748",
  "profile": {
    "firstname": "John",
    "lastname": "Doe",
    "username": "travel_John",
    "email": "john.travel@gmail.com",
    "address": "John's Home",
    "twitter": "travel_john"
  },
  "preferences": {
    "options_plane": 1, 
    "options_public": 1, 
    "options_taxi": 1,     
    "options_rental": 1, 
    "priority": "public, rental, taxi, plane",
    "arrival": 0,
    "transfer": 1,
    "breakfast": 1,
    "buffer": 120
  },
  "privacy": {
    "newsletter": 0
  }
}
```

#### Profile

##### Format

```
<profile> ::= {
    "firstname" : <string>,
    "lastname" : <string>,
    "username" : <string>,
    "email" : <string>,
    "address" : <string>,
    "twitter" : <string>
}
```

##### Example

```JSON
{
  "firstname": "John",
  "lastname": "Doe",
  "username": "travel_John",
  "email": "john.travel@gmail.com",
  "address": "John's Home",
  "twitter": "travel_john"
}
```

#### Preferences

##### Format

```
<profile> ::= { 
  "options_plane" : <int>, 
  "options_public" : <int>, 
  "options_taxi" : <int>,     
  "options_rental" : <int>, 
  "priority" : <string>,
  "arrival" : <int>,
  "transfer" : <int>,
  "breakfast" : <int>,
  "buffer" : <int> 
}
```

##### Example

```JSON
{
  "options_plane": 1, 
  "options_public": 1, 
  "options_taxi": 1,     
  "options_rental": 1, 
  "priority": "public, rental, taxi, plane",
  "arrival": 0,
  "transfer": 1,
  "breakfast": 1,
  "buffer": 120
}
```

#### Privacy

##### Format

```
<privacy> ::= {
    "newsletter" : <int>
}
```

##### Example

```JSON
{
  "newsletter": 0
}
```

#### Authentication

##### Format

```
<authentication> ::= {
    "token" : <string>,
    "expires" : <int>
}
```

##### Example

```JSON
{
   "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1NDA2YzEwZWZjOTJmNDkyMmViMjY3NDgiLCJleHAiOjE0MTI2MTEyNjE1NDh9.H2UQCZuPsdXGydxmqOs-lwLDwdkps5G9tEuHH3Ghx7Q",
   "expires": 1412611261548
}
```



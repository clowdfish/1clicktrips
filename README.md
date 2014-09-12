trip-to-go
==========

The business traveler platform offering end to end trip management.

<h2>Project structure and content</h2>

<ul>
<li>app: the server side code</li>
<li>config: the server side configuration files</li>
<li>deploy.sh: deployment script to setup server environment</li>
<li>package.json: typical npm package file</li>
<li>server.js: the starting point of the application</li>
<li>setup.sh: is executed on the server for preparing the Node application</li>
</ul>

<h2>Server requirements</h2>

<h3>Directory structure</h3>
The application is deployed to ~/server/dev (add "dev" as parameter) or ~/server/build (add "prod" as parameter), so make sure those folders exist. 

The Express.js server is configured to serve its static files from /var/www.
So you either put the static files (e.g. html, images, js, css) directly into that directory or you create a symlink that redirects /var/www to the proper folder with the static content.

Express.js listens on port 8081, so make sure that no other application is listening on the same port when the application starts. 

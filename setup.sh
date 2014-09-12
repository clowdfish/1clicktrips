#!/bin/bash
app_name="ttg-server"

cd /home/sascha/www/$app_name
pwd

if [ ! -f ./package.json ]; then
	echo 'No package.json found.'			
else
	echo "Installing Node modules..."
	npm install

	#echo "Starting tests..."

	echo "Start server with Forever..." 
	forever start server.js
	forever list
fi








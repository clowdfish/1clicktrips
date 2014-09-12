#!/bin/bash

# script is executed from the home directory of the given user
cd server/dev

if [ ! -f ./package.json ] ; then
	echo 'No package.json found.'		
	# exit code 0 indicates an error
	exit 0
else
	echo "Installing Node modules"
	echo "..."
	npm install

	echo "Stop existing Forever processes"
	echo "..."
	forever stopall

	echo "Remove old logs"
	echo "..."
	forever cleanlogs	
	
	echo "Start server" 
	echo "..."
	forever start -m 10 -l ./logs/forever.log -o out.log -e err.log -a --minUptime 1000 --spinSleepTime 1000 server.js
	
	return_value=$(forever list)
	echo $return_value
	if [[ $return_value =~ "No forever process" ]] ; then
		# exit code 0 indicates an error
		exit 0
	else
		exit 1
	fi
fi





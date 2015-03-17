#!/bin/bash

# script is executed from the home directory of the given user
cd 1clicktrips

if [ ! -f ./package.json ] ; then
	echo 'No package.json found.'		
	# exit code 0 indicates an error
	exit 0
else
	if [ $# -eq 1 ] && [ "$1" == "-install" ] ; then
		echo "Installing Node modules"
		echo "..."
		npm install
	fi

	echo "Stop existing Forever processes"
	echo "..."
	forever stopall

	echo "Remove old logs"
	forever cleanlogs	

	if [ ! -d ./logs ] ; then 
		echo "Create directory for logs"
		mkdir logs
	fi 
	
	echo "Start server" 
	echo "..."
	# see https://github.com/nodejitsu/forever for details
	forever start -m 10 -l logs/forever.log -o logs/console.log -e logs/error.log -a --minUptime 1000 --spinSleepTime 1000 server.js
	
	# wait for forever to set itself into place	
	sleep 3

	return_value=$(forever list)
	echo $return_value
	if [[ $return_value =~ "No forever process" ]] ; then
		# exit code 0 indicates an error
		exit 0
	else
		exit 1
	fi
fi





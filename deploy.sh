#!/bin/bash

deployment_profile=$1
base_directory="/home/sascha/server/dev"

if [ $# -eq 1 ] ; then
	if [ "$deployment_profile" == "dev" ] ; then
		if [ ! -f ./package.json ]; then
			echo -e "File \"package.json\" not found. Did you start the script in a proper directory?"
		else		
			echo -e "\nDeployment for development environment"
			echo "Synchronizing files to server"
			echo "..."
			rsync -arv --exclude='.git*' --exclude='node_modules' --exclude='deploy.sh' --exclude='*~' -e ssh ./ sascha@dev.efexcon.com:$base_directory

			echo "Preparing server"
			echo "..."
			ssh sascha@dev.efexcon.com $base_directory/setup.sh
			
			if [[ $? != 0 ]] ; then
				echo "SUCCESS: Server is up and running."
			else
				echo "ERROR: Server could not be started."
			fi
		fi
	else
		if [ "$deployment_profile" == "prod" ] ; then
			echo -e "\nDeployment for production environment"
			echo "Create a new version directory on the server..."
			echo "Copy files to the the new version directory on the server..."
			echo "Starting server..."
 	else
			echo "Wrong parameter given."
		fi
	fi
else
	echo "Wrong number of parameters given."
fi








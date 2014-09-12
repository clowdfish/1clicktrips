#!/bin/bash
deployment_profile=$1
build_directory="dist"
base_directory="/home/sascha/server/dev/"

if [ $# -eq 1 ] ; then
	if [ "$deployment_profile" == "dev" ] ; then
		if [ ! -f ./package.json ]; then
			echo "File \"package.json\" not found. Did you start the script in a proper directory?"
		else		
			echo "Deployment for development environment"
			echo ""
			echo "Synchronizing files to server"
			echo "..."
			rsync -arv --exclude='node_modules' --exclude='build.sh' --exclude='*~' -e ssh ./ sascha@dev.efexcon.com:$base_directory

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
			echo "Starting deployment for PRODUCTION environment"
			
			if [ -d $build_directory ]; then
				echo "build the project and create a version number"

				echo "create a new version directory on the server"

				echo "copy the *required* files to the the new version directory on the server"

				echo "modify the symlink to point to the new directory"

			else 
				echo "Build directory ( \""$build_directory"\" ) not available. Did you start the script in a proper directory?"
			fi 
			
  	else
			echo "Wrong parameter given."
		fi
	fi
else
	echo "Wrong parameter given."
fi








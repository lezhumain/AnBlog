#!/bin/bash

file="x.txt"

if [ -e $file ]
then
	echo "Already exists" > $file
else
    rm -rf ./node_module
	rm -f package-lock.json
	npm i
	npx webdriver-manager update --versions.chrome 76.0.3809.68
	#npm run e2e
	echo "Already exists" > $file
fi

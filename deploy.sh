#!/bin/bash

grunt build
cd ../webapp_hosted
git checkout gh-pages
rm -rf *
cp -a ../webapp/dist/* .
git add .
git commit -a -m 'Deployed from local copy'
git push

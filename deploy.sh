#!/bin/bash

grunt build
cd ../webapp_hosted
git checkout gh-pages
rm -rf *
echo "meteo.bulte.net" > CNAME
cp -a ../webapp/dist/* .
git add --all .
git commit -a -m 'Deployed from local copy'
git push

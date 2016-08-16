# node-angular-boilerplate
This is my personal boilerplate for an express and angular application

Remember to fill the information inside package.json and bower.json

Run npm install and bower install to download all the dependencies.

This boilerplate use gulp. Use gulp serve to start the server and check localhost:3000.

Gulp copy html and js files and your assets (images, fonts etc.) from /view/assets to /src/assets.
Gulp use watches to reload the server if you change something in a js or jade file, moreover you can minify/uglify js before.
Gulp use wathces to recompile sass and reload the server if you change a sass file.

The directory to serve static content is src.

All custom js files have to be declared in the layout file.
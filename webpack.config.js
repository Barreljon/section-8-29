const path = require('path'); //variable to store path. Don't need to npm install "path" as "path" is part of node library

const postCSSPlugins = [ //array to load plugins through npm install before we can add them
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('autoprefixer')
];

module.exports = { // Setup webpack so when it loads this file, it knows that "moudule.exports" javascript object is what to export and used
    entry: './app/assets/scripts/App.js', //Show webpack where to look for the entry point to our javascript application. (The file we want webpack to watch/process/bundle lives at this path)
    output: { //without this the default folder will be "dist" and default file in "dist" will be "main.js"
        filename: 'bundled.js', //"bundle.js" will be created in specified folder below
        path: path.resolve(__dirname, 'app'), //"path.resolve(__dirname, 'app')" returns absolute path to correct folder. Change 'app' to create a different folder.
    },
    devServer: {
        before: function (app, server){
            server._watch('./app/**/*.html'); //add property named "before". Give it a function with 2 parameters (app, server). "server" has a method named "_watch()". We tell it to watch for changes to any file with .html extension: "./app" is the folder. ** is any other folders. /*.html is any file ending in .html */
        },
        contentBase: path.join(__dirname,'app'),
        hot: true, //allows webpack to inject our new css/js into browsers memory on the fly without reload/refresh. Webpack calls that "hot module replacement"
        port: 3000, //We remove the "watch: true," from below as devServer will watch for changes. Port value is 8080 by default - we set to 3000 as it's easier to remember
        host: '0.0.0.0'
    },
    mode: 'development', //Defaults to production ifmode not set. Gets rid of "WARNING in configuration" message in console
    // watch: true, //Instead of having to run "npm run dev" everytime we make a change - Setting "watch: true" keeps webpack running and it will detect anychange we make to our source file. Press "ctrl+c" to stop webpack continously running. 
    module: { //create javascript object with{}
        rules: [ //create rules array with[]
            {
                test: /\.css$/i, //only if file ends in .css
                use: [
                    'style-loader',
                    'css-loader?url=false',
                    { loader: 'postcss-loader', options: {plugins: postCSSPlugins }}] //created postCSSPlugins array variable to list plugins
            } 
        ]
    }
}
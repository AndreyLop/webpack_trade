const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const autoprefixer = require("autoprefixer");
const path = require("path");
const fs = require("fs");
const glob = require("glob");

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!AHTUNG!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// If you want to generate separate js file place it inside src/js ROOT folder
// If you want to add to existing file edit existing file or create subfolder inside src/js/ and import file using ES6 imports
// Same goes for SCSS files inside src/sass -> new CSS file, inside new folder in src/sass -> MUST IMPORT 

// npm run dev for development
// npm run build to build
// all files generated inside /wp-content/themes/trademy/assets js, css folders

// If you added new file YOU MUST stop webpack and run npm run dev AGAIN

// Get all files in src/js ROOT with js extension and return object literal
const jsFiles = fs.readdirSync("./src/js/")
    .filter(file => file.match(/\.js$/))
    .reduce((obj, fileName) => {
        obj[fileName.replace(/\.[^/.]+$/, "")] = "./src/js/" + fileName;
        return obj;
    }, {});

module.exports = (env, options) => {

    const isDevelopment = options.mode === 'development';

    return {
        devtool: 'source-map', //source map for js
        entry: 
            {
                ...jsFiles,
                css: [...glob.sync("./src/sass/*.scss")] //Read all scss files from src/sass ROOT folder
            },
        output: {
            path: path.resolve(__dirname, '../wp-content/themes/trademy/assets'),
            filename: "js/[name].js"
        },
        optimization: {
            minimizer: [
              new UglifyJsPlugin({
                cache: true,
                parallel: true,
              }),
              new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                  map: {
                    inline: false
                  }
                }
              })
            ]
        },
        plugins: [
            new FixStyleOnlyEntriesPlugin(), //Remove unnecessary css.js ....
            new MiniCssExtractPlugin()
        ],
        module: {
            rules: [
                {
                    test: /\.js/,
                    exclude: /(node_modules|bower_components)/,
                    use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }]
                },
                // Styles tasks
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'css/[name].css'
                            }
                        },
                        {
                            loader: 'extract-loader'
                        },
                        // To have one css file remove extract-loader and file loader and uncomment MiniCssExtractPlugin
                        // {
                        //     loader: MiniCssExtractPlugin.loader
                        // },
                        {
                            loader: 'css-loader', // Loads styles
                            options: {
                                url: false,
                            },
                        },
                        {
                            loader: 'postcss-loader', // Autoprefixing
                            options: {
                                plugins: [
                                    autoprefixer({
                                        browsers:['ie >= 8', 'last 4 version']
                                    })
                                ],
                            }
                        },
                        {
                            loader: 'sass-loader', // Converts sass to css
                        }
                    ],
                }
            ]
        },
        watch: isDevelopment ? true : false
    }
}
var version = require('./package.json').version;
var path = require( 'path' );

const babelSettings = {
  plugins: [
    'add-module-exports',
    'transform-regenerator',
    'transform-decorators-legacy'
  ],
  presets: [ 'es2015', 'react', 'stage-1' ]
};


module.exports = [
    {
      entry: './src/index.js',
      output: {
          filename: 'index.js',
          path: '../example/static',
          libraryTarget: 'umd'
      },
      module : {
        loaders : [
          {
            test: /\.(js|jsx)?$/,
            exclude: /(node_modules|bower_components)/,
            loaders: [`babel?${JSON.stringify( babelSettings )}`]
          },
          {
            test: /\.(ts|tsx)?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
          },
          // { test: /\.css$/, loader: "style-loader?sourceMap!css-loader?importLoaders=1" },
          {
            test: /\.json$/, loader: 'json-loader'
          },
          {
            test: /\.(scss)$/,
            use: [{
              // inject CSS to page
              loader: 'style-loader'
            }, {
              // translates CSS into CommonJS modules
              loader: 'css-loader'
            }, {
              // Run postcss actions
              loader: 'postcss-loader',
              options: {
                // `postcssOptions` is needed for postcss 8.x;
                // if you use postcss 7.x skip the key
                postcssOptions: {
                  // postcss plugins, can be exported to postcss.config.js
                  plugins: function () {
                    return [
                      require('autoprefixer')
                    ];
                  }
                }
              }
            }, {
              // compiles Sass to CSS
              loader: 'sass-loader'
            }]
          }

        ]
      }
    }
];

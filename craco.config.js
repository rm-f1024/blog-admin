const CracoLessPlugin = require('craco-less');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack')
module.exports = {
  webpack: {
    plugins: [
         new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false,
                    drop_debugger: true,
                    drop_console: true,
                },
            },
            sourceMap: false,
            parallel: true,
        }),
            ]
},









  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#87e8de' },
            javascriptEnabled: true,
          },
        },
      },
    },






  ],
};
const { override, fixBabelImports, addLessLoader, addWebpackAlias, addPostcssPlugins } = require('customize-cra');

const path = require("path");
module.exports = override(
  addWebpackAlias({
    assets: path.resolve(__dirname, './src/assets'),
    components: path.resolve(__dirname, './src/components'),
    pages: path.resolve(__dirname, './src/pages'),
    common: path.resolve(__dirname, './src/common')
  }),
  // 针对antd 实现按需打包：根据import来打包 (使用babel-plugin-import)
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,//默认'css',设置为true,即支持less
  }),
  // 使用less-loader对源码重的less的变量进行重新制定，设置antd自定义主题
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: { '@primary-color': '#1DA57A' },
    }
  }),
 )

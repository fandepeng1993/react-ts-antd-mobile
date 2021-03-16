const {override, fixBabelImports, addLessLoader, addPostcssPlugins, addWebpackAlias, addWebpackPlugin, addDecoratorsLegacy, overrideDevServer} = require('customize-cra');
const theme = require('./theme');
const webpack = require('webpack');
const path = require('path');
const px2remPlugin = require('postcss-plugin-px2rem');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

const analyze = process.env.REACT_APP_ANALYZE; //是否分析打包数据
const SERVERDEV = process.env.REACT_APP_ENV||'dev';
const BASEURL = process.env['REACT_APP_ENV_'+SERVERDEV];



// 生产环境下删除sourceMap文件
if (process.env.NODE_ENV === 'production') process.env.GENERATE_SOURCEMAP = 'false';
// 删除ManifestPlugin
const removeManifest = () => config => {
  config.plugins = config.plugins.filter(
    p => p.constructor.name !== 'ManifestPlugin'
  );
  return config;
};

// 配置代理
const addProxy = () => (configFunction) => {
  configFunction.proxy = {
    // '/v2ex/': {
    //   target: 'https://www.v2ex.com',
    //   changeOrigin: true,
    //   pathRewrite: {'^/v2ex': '/'}
    // }
  };
  return configFunction;
};

module.exports = {
  webpack: override(
    removeManifest(),
    addLessLoader(
      {
        modifyVars: {
          ...theme
        }
      }
    ),
    addPostcssPlugins([px2remPlugin({
      rootValue: 37.5, //换算基数，1rem相当于10px,值为37.5时,1rem为20px,淘宝的flex默认为1rem为10px
      // unitPrecision: 5, //允许REM单位增长到的十进制数字。
      //propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
      // propBlackList: [], //黑名单
      exclude: /(node_module)/, //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)\/如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
      // selectorBlackList: [], //要忽略并保留为px的选择器
      // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
      // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
      mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
      minPixelValue: 3 //设置要替换的最小像素值(3px会被转rem)。 默认 0
    })]),
    fixBabelImports('import', {
      libraryName: 'antd-mobile',
      libraryDirectory: 'es',
      style: true
    }),
    addWebpackPlugin(new webpack.DefinePlugin({
      BASEURL: JSON.stringify(BASEURL),
    })),
    analyze && addWebpackPlugin(new BundleAnalyzerPlugin()),
    //别名配置
    addWebpackAlias({
      '@': path.join(__dirname, '../src')
    }),
    //装饰器配置项
    addDecoratorsLegacy(),
    (config) => { //暴露webpack的配置 config ,evn
      // 去掉打包生产map 文件
      // config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false;

      const paths = require('react-scripts/config/paths');
      // 配置打包目录输出到dist/PKG.name ${PKG.name}
      paths.appBuild = path.join(path.dirname(paths.appBuild), `dist`);
      config.output.path = paths.appBuild;
      /* paths.publicUrlOrPath = './';
      config.output.publicPath = './'; */

      if (process.env.NODE_ENV === 'production') {
        config.devtool = false;
      }
      if (process.env.NODE_ENV !== 'development') {
        // console.log(config.plugins);
        //config.plugins = [...config.plugins, ...myPlugin];
      }
      //1.修改、添加loader 配置 :
      // 所有的loaders规则是在config.module.rules(数组)的第二项
      // 即：config.module.rules[2].oneof  (如果不是，具体可以打印 一下是第几项目)
      // 修改 sass 配置 ，规则 loader 在第五项(具体看配置)
      /* const loaders = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf;
      loaders[5].use.push({
        loader: 'sass-resources-loader',
        options: {
          resources: path.resolve(__dirname, '../src/style/variables.scss')//全局引入公共的scss 文件
        }
      }); */
      return config;
    }
  ),
  devServer: overrideDevServer(
    addProxy()
  )
};
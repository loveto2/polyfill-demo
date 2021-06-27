const path = require('path')
const { name } = require('./package');
const Webpackbar = require('webpackbar')
const { getPaths, edit, appendWebpackPlugin } = require('@rescripts/utilities')

const resolve = dir => path.join(__dirname, dir)

const webpackConfig = {

  webpack: config => {
    config.mode='development'
    config.output.library = `${name}-[name]`;
    config.output.libraryTarget = 'umd';
    config.output.jsonpFunction = `webpackJsonp_${name}`;
    config.output.globalObject = 'window';
    // 设置打包输出目录 和 BUILD_PATH 环境变量必须一致 否则就会报错
    // config.output.path = resolve('../dist/react');
    // config.output.publicPath = '/micro/react/';

    config.resolve.extensions = ['.js', '.jsx']

    config.resolve.alias = {
      '@': resolve('./src'),
      '@pages': resolve('./src/pages'),
      '@shared': resolve('./src/shared')
    }

    return config;
  },

  devServer: _ => {
    const config = _;

    config.headers = {
      'Access-Control-Allow-Origin': '*',
    };
    config.historyApiFallback = true;
    config.hot = false;
    config.watchContentBase = false;
    config.liveReload = false;
    config.disableHostCheck = true;

    return config;
  },
};

const babelConfig = config => {
  // 获取整个 rules 那一大坨代码
  const target = getPaths(
    (inQuestion) => inQuestion && !!inQuestion.oneOf,
    config
  )
  edit(
    (section) => {
      // 获取所有 rule loader
      const loaders = section.oneOf
      // 获取 babl-loader 配置
      const index = loaders.findIndex(section => section.loader.includes('babel-loader'))
      // const babelLoader = loaders.find(section => section.loader && section.loader.includes('babel-loader'))
      // const { loader } = babelLoader
      // 在 plugins 中插入 babel-plugin-inport 插件
      // loaders.splice(index, 0, {
      //   ...babelLoader,
      //   test: /\.(js|mjs)$/,
      //   exclude: /core-js|core-js-pure|regenerator-runtime/,
      //   include: /node_modules/,
      // })
      // console.log(babelLoader.options)
      // babelLoader.configFile = true
      loaders.splice(index, 2, {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              configFile: false,
              compact: false,
              presets: [
                [
                  '@babel/preset-env', {
                    modules: false,
                    // debug: true,
                    // corejs: {
                    //   proposal: true,
                    //   version: 3.15
                    // },
                    // // useBuiltIns: 'entry',
                    // useBuiltIns: 'usage',
                    // targets: 'IE 9'
                  }
                ],
                [
                  '@babel/preset-react', {
                    'runtime': 'automatic'
                  }
                ]
              ],
              plugins: [
                [
                  '@babel/plugin-transform-runtime',
                  {
                    corejs: {
                      proposals: true,
                      version: 3
                    }
                  }
                ]
              ],
              cacheDirectory: true,
              cacheCompression: false,
              sourceMaps: true,
              inputSourceMap: true
            }
          }
        ]
      })
      loaders.splice(index, 0, {
        test: /\.(js|mjs)$/,
        include: /node_modules/,
        exclude: /core-js|core-js-pure|regenerator-runtime/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              configFile: false,
              compact: false,
              presets: [
                [
                  '@babel/preset-env', {
                    modules: false,
                    // debug: true,
                    // corejs: {
                    //   proposal: true,
                    //   version: 3.15
                    // },
                    // // useBuiltIns: 'entry',
                    // useBuiltIns: 'usage',
                    // targets: 'IE 9'
                  }
                ],
                [
                  '@babel/preset-react', {
                    'runtime': 'automatic'
                  }
                ]
              ],
              plugins: [
                [
                  '@babel/plugin-transform-runtime',
                  {
                    corejs: {
                      proposals: true,
                      version: 3
                    }
                  }
                ]
              ],
              cacheDirectory: true,
              cacheCompression: false,
              sourceMaps: true,
              inputSourceMap: true
            }
          }
        ]
      })
      return section
    },
    target,
    config
  )
  return config
}

const processBarConfig = config => {
  return appendWebpackPlugin(
    new Webpackbar(),
    config,
  )
}

module.exports = [
  // babelConfig,
  webpackConfig,
  // processBarConfig,
  ['use-babel-config', ' babel.config']
]
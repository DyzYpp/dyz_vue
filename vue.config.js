const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        // $:"jquery",
        // jQuery:"jquery",
        // "windows.jQuery":"jquery"
      })
    ]
  },
  publicPath: './',
  assetsDir: './assets',
  productionSourceMap: false,
  lintOnSave: false, // 是否开启eslint
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    https: false,
    open: true,
    // 设置代理proxy
    proxy: {
      '/des': {
        target: "http://localhost:8090",
        changeOrigin: true,    //表示是否跨域，
        pathRewrite: {        //表示需要rewrite重写的
          '^/dyz': '/dyz',
        }
      },
      // '/download': {
      //   target: "http://192.168.0.116:8080",
      //   changeOrigin: true,    //表示是否跨域，
      //   pathRewrite: {        //表示需要rewrite重写的
      //     '^/download': '/download',
      //   }
      // },
    }
  },
  configureWebpack: (config) => {
    let plugins = [];
    if (process.env.NODE_ENV === 'production') {
      plugins = [
        new webpack.DefinePlugin({
        }),
      ]
    } else {
      plugins = [
        new webpack.DefinePlugin({
        }),
      ]
    }
    return {
      module: {
        unknownContextCritical: false,
        rules: [
          {
            test: /\.js$/,
            enforce: 'pre',
            sideEffects: false,
            use: [
              {
                loader: 'strip-pragma-loader',
                options: {
                  pragmas: {
                    debug: false
                  }
                }
              }
            ]
          }
        ]
      },
      optimization: {
        usedExports: true,
        splitChunks: {
          maxInitialRequests: Infinity,
          minSize: 0,
          maxSize: 250000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              chunks: 'all',
              name(module) {
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                return `npm.${packageName.replace('@', '')}`
              }
            },
            commons: {
              name: 'Cesium',
              test: "",
              priority: 10,
              chunks: 'all'
            }
          }
        }
      },

      output: {
        sourcePrefix: ' '
      },
      amd: {
        toUrlUndefined: true
      },
      resolve: {
        alias: {
          vue$: 'vue/dist/vue.esm.js',
          '@': path.resolve('src')
        }
      },
      node: {
        fs: 'empty',
        Buffer: false,
        http: 'empty',
        https: 'empty',
        zlib: 'empty'
      },
      plugins: plugins
    }
  }

}

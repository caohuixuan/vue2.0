var path = require('path')
var webpack = require('webpack')
const HtmlWebpackPlugin=require('html-webpack-plugin');
const CleanWebpackPlugin=require('clean-webpack-plugin');
const ExtractTextPlugin=require("extract-text-webpack-plugin");
const ExtractCSS = new ExtractTextPlugin({
            filename: 'css/[name].css' //路径以及命名
        });
const ExtractLESS = new ExtractTextPlugin({
            filename: 'css/[name].css' //路径以及命名
        });
module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'build-[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        /*use: [
          'vue-style-loader',
          'css-loader'
        ],*/
       loader: ExtractCSS.extract({ fallback: 'style-loader', use: 'css-loader' }),
                exclude: /node_modules/,
      },     
        {
       test:/\.less$/,
             use:ExtractLESS.extract({ //分离less编译后的css文件
                fallback:'style-loader',
                use:['css-loader','less-loader']
            }),
              exclude: /node_modules/,
      },  
       {
        test: /\.vue$/,
        loader: 'vue-loader',
         options: {
                    loaders: {
                        less: ExtractTextPlugin.extract({ fallback: 'vue-style-loader', use: 'css-loader!less-loader' }),
                        css: ExtractTextPlugin.extract({ fallback: 'vue-style-loader', use: 'css-loader' })
                    }
                    // other vue-loader options go here
                }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          name: '[name].[ext]?[hash]',
          limit:'1024',
          outputPath:'img/'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    contentBase:'./dist',
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    port:'6001'
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
if (process.env.NODE_ENV === 'development') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
     new webpack.HotModuleReplacementPlugin(),
    new webpack.BannerPlugin('版权所有'),
    new HtmlWebpackPlugin({
      title:"使用静态资源版权管理",
      filename:'./index.html',
      template:__dirname+'/src/index.temp.html'
    }),
    new CleanWebpackPlugin('dist', {
      root: __dirname,
      verbose: true,
      dry: false
  }),
  ExtractCSS,
  ExtractLESS
    ])
}
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const lessHappyLoaderId = 'happypack-for-less-loader';
const cssHappyLoaderId = 'happypack-for-css-loader';

const isDebug = process.env.NODE_ENV !== 'production';

const cssLoader = {
  loader: `css-loader`,
  options: {
    sourceMap: isDebug,
    modules: true,
    localIdentName: '[local]',
  }
}

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    config: {
      path: __dirname
    }
  }
}

const lessLoader = {
  loader: 'less-loader',
  options: {
    sourceMap: isDebug,
    javascriptEnabled: true  // 支持内联JavaScript
  }
}

const lessConfig = {
  module: {
    rules: []
  },
  plugins: [],
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin({ // 使用 OptimizeCssAssetsPlugin 对css进行压缩
      cssProcessor: require('cssnano'),   // css 压缩优化器
      cssProcessorOptions: { discardComments: { removeAll: true } } // 去除所有注释
    })]
  }
};

let loaders = [];
let plugins = [];

if (isDebug) {
  loaders = [{
    test: /\.less$/,
    loader: 'happypack/loader',
    query: {id: lessHappyLoaderId}
  }, {
    test: /\.css$/,
    loader: 'happypack/loader',
    query: {id: cssHappyLoaderId}
  }]

  plugins = [new HappyPack({
    id: lessHappyLoaderId,
    threadPool: happyThreadPool,
    loaders: ['style-loader', cssLoader, postcssLoader, lessLoader ]
  }),  new HappyPack({
    id: cssHappyLoaderId,
    threadPool: happyThreadPool,
    loaders: ['style-loader', cssLoader, postcssLoader ]
  })]

} else {

  loaders = [{
    test: /\.less$/,
    use: [MiniCssExtractPlugin.loader, {
      loader: 'happypack/loader',
      query: {id: lessHappyLoaderId}
    }]
  }, {
    test: /\.css/,
    use: [MiniCssExtractPlugin.loader, {
      loader: 'happypack/loader',
      query: {id: cssHappyLoaderId}
    }]
  }]

  plugins = [new MiniCssExtractPlugin({
    filename: '[name].css',
    // chunkFilename: "[id].css"
  }), new HappyPack({
    id: lessHappyLoaderId,
    loaders: [
      cssLoader,
      postcssLoader,
      lessLoader
    ],
    threadPool: happyThreadPool
  }), new HappyPack({
    id: cssHappyLoaderId,
    loaders: [
      cssLoader,
      postcssLoader
    ],
    threadPool: happyThreadPool
  })]
}

lessConfig.module.rules = lessConfig.module.rules.concat(loaders);
lessConfig.plugins = lessConfig.plugins.concat(plugins);

module.exports = lessConfig;

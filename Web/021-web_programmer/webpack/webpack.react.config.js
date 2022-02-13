const path = require('path');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const happyLoaderId = 'happypack-for-react-babel-loader';

const babelLoader = {
  test: /\.jsx?$/,
  loader: 'babel-loader',
  include: [path.resolve(process.cwd(), 'src')]
}
const reactConfig = {
  module: {
    rules: [{
      test: babelLoader.test,
      loader: 'happypack/loader',
      query: {
        id: happyLoaderId
      },
      include: babelLoader.include
    }]
  },
  plugins: [new HappyPack({
    id: happyLoaderId,
    threadPool: happyThreadPool,
    loaders: [babelLoader]
  })]
}

delete babelLoader.test;
delete babelLoader.include;

module.exports = reactConfig;

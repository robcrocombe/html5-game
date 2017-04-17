import gulp from 'gulp';
import gutil from 'gulp-util';
import path from 'path';
import webpack from 'webpack';
import { CheckerPlugin } from 'awesome-typescript-loader';

let firstRun = true;

const jsConfig = {
  resolve: {
    extensions: ['.ts', '.js']
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.ts$/,
        exclude: /(node_modules|build)/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  entry: {
    app: path.resolve(__dirname, 'src/app.ts')
  },
  output: {
    path: path.resolve(__dirname,'build/'),
    filename: 'app.bundle.js'
  },
  plugins: [
    new CheckerPlugin()
  ]
};

function runWebpack(config, done) {
  webpack(config, (err, stats) => {
    if (err) {
      gulp.emit('error', new gutil.PluginError('webpack', err));
    }

    gutil.log(
      '[webpack]',
      stats.toString({
        colors: gutil.colors.supportsColor,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false,
        modules: false,
        children: true,
        version: true,
        cached: false,
        cachedAssets: false,
        reasons: false,
        source: false,
        errorDetails: false,
      }),
    );

    if (firstRun) {
      firstRun = false;
      done();
    }
  });
}

function jsDev(done) {
  const config = Object.assign({
    watch: true,
  }, jsConfig);

  runWebpack(config, done);
}

function jsProd(done) {
  const config = Object.assign({
    plugins: [
      new webpack.optimize.UglifyJsPlugin(),
    ],
  }, jsConfig);

  runWebpack(config, done);
}

function htmlCopy() {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('build/'));
}

gulp.task('dev:build', jsDev);
gulp.task('pro:build', jsProd);
gulp.task('dev:html', htmlCopy);
gulp.task('default', ['dev:html'], jsDev);

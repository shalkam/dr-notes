var gulp = require('gulp');
var path = require('path');
const shell = require('child_process').execSync;
var runSequence = require('run-sequence');
var asar = require('asar');
var fs = require('fs');
var nodemon = require('nodemon');
var spawn = require('child_process').spawn;
// const seed = require('./db/seed.js');
var fetchSchema = require('fetch-graphql-schema');
var frontendCompiler = require('./src/client/webpack.js');
var electronCompiler = require('./webpack.electron.js');
var serverCompiler = require('./webpack.server.js');
var config = require('./config.js');
var ElectronPrc;
var ServerPrc;
function watchElectron() {
  var paths = {
    darwin: 'dist/Electron.app/Contents/MacOS/Electron',
    freebsd: 'dist/electron',
    linux: 'dist/electron',
    win32: 'dist/electron.exe'
  };
  var electronPath = path.join(__dirname, 'node_modules', 'electron', paths[process.platform]);
  ElectronPrc = spawn(electronPath, [path.join(__dirname, 'dist', 'main.js')]);
  ElectronPrc.stdout.setEncoding('utf8');
  ElectronPrc.stdout.on('data', function(data) {
    var str = data.toString();
    console.log(str);
  });
  ElectronPrc.stderr.on('data', function(data) {
    var str = data.toString();
    console.error(str);
  });
  ElectronPrc.on('close', (code, signal) => {
    if (signal === 'SIGUSR2') {
      console.log('restarting electron ....');
      watchElectron();
    }
  });
  ElectronPrc.on('SIGINT', function() {
    process.exit();
  });
}
function onBuild(done) {
  return function(err, stats) {
    if (err) {
      console.log('Error', err);
    } else {
      console.log(stats.toString());
    }
    if (done) {
      done();
    }
  };
}

gulp.task('build-client', function(done) {
  frontendCompiler.run(onBuild(done));
});

gulp.task('build-server', function(done) {
  serverCompiler.run(onBuild(done));
});

gulp.task('build-electron', function(done) {
  electronCompiler.run(onBuild(done));
});

gulp.task('watch-electron', function(done) {
  var firedDone = false;
  watchElectron();
  electronCompiler.watch(1000, function(err, stats) {
    console.log(firedDone);
    // if it's first time compiling
    if (firedDone === false) {
      firedDone = true;
      done();
    } else {
      ElectronPrc.kill('SIGUSR2');
    }
    console.log('Electron compiled');
  });
  process.on('SIGINT', function() {
    process.exit();
  });
});
gulp.task('dev-server', function(done) {
  var firedDone = false;
  serverCompiler.watch({ ignored: /node_modules/ }, function(err, stats) {
    // if it's first time compiling
    if (!firedDone) {
      firedDone = true;
      nodemon({
        execMap: { js: 'node' },
        script: path.join(__dirname, 'dist/server'),
        ignore: ['*', 'src/client'],
        watch: ['foo/'],
        ext: 'noop'
      })
        .on('restart', function() {
          console.log('Patched!');
        })
        .on('quit', () => {
          process.exit();
        });
      done();
    }
    nodemon.restart();
  });
});
gulp.task('dev-client', function(done) {
  frontendCompiler.watch(
    {
      // ignored: /node_modules/
    },
    function(err, stats) {
      console.log('Front-end compiled');
    }
  );
  process.on('SIGINT', function() {
    process.exit();
  });
});
// gulp.task('dev-client', function(done) {
//   var firedDone = false;
//   console.log('Waiting for server to compile...');
//   serverCompiler.run(function(err, stats) {
//     var output = stats.compilation.outputOptions;
//     console.log('Server compiled...');
//     console.log('Starting server...');
//     // console.log(stats.compilation.outputOptions);
//     require(path.join(output.path, output.filename));
//   });
//   process.on('SIGINT', function() {
//     console.log('Caught interrupt signal');
//     process.exit();
//   });
// });
gulp.task('build-schema', ['dev-server'], function getSchema() {
  fetchSchema(config.APP_URL + ':' + config.APP_PORT + '/' + config.GQL_URL_DIR, { readable: true })
    .then(function(schema) {
      fs.writeFile(path.join(__dirname, 'src/data/schema.graphql'), schema, function(err) {
        if (err) {
          return console.log(err);
        }
        console.log('Schema saved to: src/data/schema.graphql');
        console.log('Closing server');
        process.exit();
      });
    })
    .catch(err => {
      if (err.code === 'ECONNREFUSED') {
        console.log('Server not loaded, retrying in one second....');
        setTimeout(getSchema, 1000);
      }
    });
});
// gulp.task('seed', seed());
gulp.task('build-dist-package', function() {
  const src = path.join(__dirname, 'src/build');
  const dist = path.join(__dirname, 'dist');
  shell(`mkdir -p ${dist}`);
  shell(`cp -r ${src}/* ${dist}`);
  console.log('Copied extra package files');
});
gulp.task('clean', function() {
  const dist = path.join(__dirname, 'dist');
  shell(`rm -rf ${dist}`);
  console.log('Cleaning dist directory');
});
gulp.task('asar', function(done) {
  const src = path.join(__dirname, 'dist');
  const dest = path.join(__dirname, 'dist/app.asar');
  asar.createPackage(src, dest, function() {
    console.log('Built asar: ' + dest);
    done();
  });
});
gulp.task('build', function(done) {
  runSequence('clean', 'build-client', 'build-electron', 'build-dist-package', 'asar', function() {
    console.log('Done building electron asar package');
    done();
  });
});
gulp.task('dev', ['dev-client', 'dev-server']);
gulp.task('run', function() {
  require(path.join(__dirname, 'dist/server.js'));
});

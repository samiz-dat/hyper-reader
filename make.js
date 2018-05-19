const fs = require('fs')
const path = require('path')
const b = require('substance-bundler')
const fork = require('substance-bundler/extensions/fork')
// const path = require('path')
const DIST = 'dist/'
const APPDIST = 'app-dist/'
const TMP = 'tmp/'
// const HYPER_READINGS_BROWSER = path.join(__dirname, 'tmp/hyper-readings.browser.js')

// Make Targets

b.task('clean', function () {
  b.rm(DIST)
  b.rm(TMP)
  b.rm(APPDIST)
}).describe('removes all generated files and folders.')

b.task('lib', ['clean', 'build:assets', 'build:lib'])
  .describe('builds the library bundle.')

b.task('lib', ['clean', 'build:assets', 'build:lib'])
  .describe('builds the library bundle.')

b.task('browser', ['clean', 'build:assets', 'build:browser'])
  .describe('builds the browser bundle.')

b.task('publish', ['clean', 'build:assets', 'build:lib', 'build:web'])
  .describe('builds the release bundle (library + web).')

b.task('web', ['clean', 'build:assets', 'build:browser', 'build:web'])
  .describe('builds the web bundle (browser + web).')

b.task('app', ['clean', 'build:assets', 'build:browser', 'build:app'])
  .describe('builds the app bundle (electron app).')

b.task('default', ['publish'])
  .describe('default: publish')

// spawns electron after build is ready
b.task('run-app', ['app'], () => {
  // Note: `await=false` is important, as otherwise bundler would await this to finish
  fork(b, require.resolve('electron/cli.js'), '.', { verbose: true, cwd: APPDIST, await: false })
})
  .describe('runs the application in electron.')

// low-level make targets

// copy assets
b.task('build:assets', () => {
  b.copy('app/index.html', './dist/index.html')
  b.copy('./node_modules/font-awesome', DIST + 'font-awesome')
  b.copy('./node_modules/substance/dist', DIST + 'substance/dist')
  b.css('hyper-reader.css', DIST + 'hyper-reader.css')
  b.css('./node_modules/substance/substance-pagestyle.css', DIST + 'hyper-reader-pagestyle.css')
  b.css('./node_modules/substance/substance-reset.css', DIST + 'hyper-reader-reset.css')
})

b.task('build:browser', () => {
  _buildLib(DIST, 'browser')
})

b.task('build:nodejs', () => {
  _buildLib(DIST, 'nodejs')
})

b.task('build:lib', () => {
  _buildLib(DIST, 'all')
})

b.task('build:app', () => {
  b.copy('app/index.html', APPDIST)
  b.copy('app/build-resources', APPDIST)
  b.copy('dist/font-awesome', APPDIST + 'lib/')
  b.copy('dist/substance', APPDIST + 'lib/')
  ;[
    'hyper-reader.js',
    'hyper-reader.css',
    'hyper-reader-pagestyle.css',
    'hyper-reader-reset.css'
  ].forEach(f => {
    b.copy(`dist/${f}`, APPDIST + 'lib/')
    b.copy(`dist/${f}.map`, APPDIST + 'lib/')
  })

  // TODO: maybe we could come up with an extension
  // that expands a source file using a given dict.
  b.custom('Creating application package.json...', {
    src: 'app/package.json.in',
    dest: APPDIST + 'package.json',
    execute: () => {
      let { version } = require('./package.json')
      let tpl = fs.readFileSync('app/package.json.in', 'utf8')
      let out = tpl.replace('${version}', version) //eslint-disable-line
      fs.writeFileSync(APPDIST + 'package.json', out)
    }
  })
  b.js('app/main.js', {
    target: {
      dest: APPDIST + 'main.js',
      format: 'cjs'
    },
    external: ['electron', 'path', 'url']
  })
  b.js('app/app.js', {
    target: {
      dest: APPDIST + 'app.js',
      format: 'umd',
      moduleName: 'hyperReaderApp',
      globals: {
        'substance': 'window.substance',
        'hyper-reader': 'window.reader'
      }
    },
    external: ['substance', 'hyper-reader']
  })
  // execute 'install-app-deps'
  fork(b, require.resolve('electron-builder/out/cli/cli.js'), 'install-app-deps', { verbose: true, cwd: APPDIST, await: true })
})

function _buildLib (DEST, platform) {
  let targets = []
  if (platform === 'browser' || platform === 'all') {
    targets.push({
      dest: DEST + 'hyper-reader.js',
      format: 'umd',
      moduleName: 'reader',
      sourceMapRoot: __dirname,
      sourceMapPrefix: 'hyper-reader'
    })
  }
  if (platform === 'nodejs' || platform === 'all') {
    targets.push({
      dest: DEST + 'hyper-reader.cjs.js',
      format: 'cjs'
    })
  }
  if (platform === 'es' || platform === 'all') {
    targets.push({
      dest: DEST + 'hyper-reader.es.js',
      format: 'es'
    })
  }
  // const commonjsModules = [
  //   'parse5',
  //   'marked',
  //   'inherits',
  //   'nanoiterator',
  //   'random-access-memory',
  //   'hyper-graph-db'
  // ]
  b.js('./index.es.js', {
    targets,
    commonjs: true,
    external: ['substance', 'hyper-reader', 'hyper-readings'],
    globals: {
      'substance': 'substance',
      'hyper-reader': 'window.reader'
    }
  })
}

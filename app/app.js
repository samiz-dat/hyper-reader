const {
  getQueryStringParam,
  substanceGlobals,
  platform
} = window.substance

const {
  DesktopApp
} = window.reader

const ipc = require('electron').ipcRenderer
const url = require('url')
const path = require('path')
const remote = require('electron').remote

const HyperReadingsManager = require('hyper-readings-manager')
const { shell } = remote

// HACK: we should find a better solution to intercept window.open calls
// (e.g. as done by LinkComponent)
window.open = function (url /* , frameName, features */) {
  shell.openExternal(url)
}

window.addEventListener('load', () => {
  substanceGlobals.DEBUG_RENDERING = platform.devtools
  DesktopApp.mount({
    hrManager: new HyperReadingsManager(getQueryStringParam('archiveDir')),
    ipc,
    url,
    path,
    shell,
    __dirname
  }, window.document.body)
})

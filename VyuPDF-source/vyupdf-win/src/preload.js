const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  openDialog:  (opts) => ipcRenderer.invoke('open-dialog', opts),
  saveDialog:  (opts) => ipcRenderer.invoke('save-dialog', opts),
  readFile:    (p)    => ipcRenderer.invoke('read-file', p),
  writeFile:   (p, d) => ipcRenderer.invoke('write-file', p, d),
  appPath:     ()     => ipcRenderer.invoke('app-path'),
  setTitle:    (t)    => ipcRenderer.invoke('set-title', t),
  onCmd: (cb) => {
    ipcRenderer.on('cmd', (_, action) => cb(action));
  },
});

const { app, BrowserWindow, ipcMain, dialog, shell, Menu, nativeTheme } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');

// Force dark mode
nativeTheme.themeSource = 'dark';

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1320,
    height: 920,
    minWidth: 960,
    minHeight: 640,
    title: 'VyuPDF',
    icon: path.join(app.getAppPath(), 'assets', 'icon.ico'),
    backgroundColor: '#1a1d27',
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: true,
    },
    titleBarStyle: 'default',
  });

  win.loadFile(path.join(__dirname, 'editor.html'));

  win.once('ready-to-show', () => {
    win.show();
    win.focus();
  });

  win.on('close', (e) => {
    // Could add dirty check here
  });

  buildMenu();
}

function buildMenu() {
  const template = [
    {
      label: 'File',
      submenu: [
        { label: 'Open PDF\tCtrl+O', accelerator: 'CmdOrCtrl+O', click: () => win.webContents.send('cmd', 'open') },
        { type: 'separator' },
        { label: 'Save\tCtrl+S', accelerator: 'CmdOrCtrl+S', click: () => win.webContents.send('cmd', 'save') },
        { label: 'Save As\tCtrl+Shift+S', accelerator: 'CmdOrCtrl+Shift+S', click: () => win.webContents.send('cmd', 'save-as') },
        { type: 'separator' },
        { label: 'Close File', click: () => win.webContents.send('cmd', 'close') },
        { type: 'separator' },
        { role: 'quit', label: 'Exit' },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { label: 'Add Text\tCtrl+T', accelerator: 'CmdOrCtrl+T', click: () => win.webContents.send('cmd', 'tool-text') },
        { label: 'Add Image', click: () => win.webContents.send('cmd', 'add-image') },
        { type: 'separator' },
        { label: 'Add Pages from PDF / Image', click: () => win.webContents.send('cmd', 'add-pages') },
      ],
    },
    {
      label: 'Page',
      submenu: [
        { label: 'Move Page Up', accelerator: 'CmdOrCtrl+Up', click: () => win.webContents.send('cmd', 'page-up') },
        { label: 'Move Page Down', accelerator: 'CmdOrCtrl+Down', click: () => win.webContents.send('cmd', 'page-down') },
        { type: 'separator' },
        { label: 'Delete Page', click: () => win.webContents.send('cmd', 'page-delete') },
      ],
    },
    {
      label: 'Tools',
      submenu: [
        { label: 'Run OCR', accelerator: 'CmdOrCtrl+R', click: () => win.webContents.send('cmd', 'ocr') },
        { label: 'Compress PDF', click: () => win.webContents.send('cmd', 'compress') },
      ],
    },
    {
      label: 'View',
      submenu: [
        { label: 'Zoom In\tCtrl++', accelerator: 'CmdOrCtrl+=', click: () => win.webContents.send('cmd', 'zoom-in') },
        { label: 'Zoom Out\tCtrl+-', accelerator: 'CmdOrCtrl+-', click: () => win.webContents.send('cmd', 'zoom-out') },
        { label: 'Actual Size\tCtrl+0', accelerator: 'CmdOrCtrl+0', click: () => win.webContents.send('cmd', 'zoom-reset') },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
    {
      label: 'Help',
      submenu: [
        { label: 'Vyuhaa Website', click: () => shell.openExternal('https://www.vyuhaadata.com') },
        { label: 'VyuPDF on vyuhaadata.com', click: () => shell.openExternal('https://www.vyuhaadata.com/vyupdf') },
        { type: 'separator' },
        { label: 'About VyuPDF', click: () => win.webContents.send('cmd', 'about') },
      ],
    },
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

// IPC
ipcMain.handle('open-dialog', async (e, opts) => dialog.showOpenDialog(win, opts));
ipcMain.handle('save-dialog', async (e, opts) => dialog.showSaveDialog(win, opts));
ipcMain.handle('read-file', async (e, p) => {
  const buf = fs.readFileSync(p);
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
});
ipcMain.handle('write-file', async (e, p, data) => {
  fs.writeFileSync(p, Buffer.from(data));
  return true;
});
ipcMain.handle('app-path', async () => app.getAppPath());
ipcMain.handle('set-title', async (e, t) => { win.setTitle(t); });

app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });

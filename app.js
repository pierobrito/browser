'use strict';

const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

app.on('window-all-closed', function () {
    if (process.platform != 'darwin')
        app.quit();
});

let ppapi_flash_path;

// Specify flash path.
// On Windows, it might be /path/to/pepflashplayer.dll
// On OS X, /path/to/PepperFlashPlayer.plugin
// On Linux, /path/to/libpepflashplayer.so
if (process.platform == 'win32') {
    ppapi_flash_path = path.join(__dirname, '/resource/pepflash/pepflashplayer.dll');
} else if (process.platform == 'linux') {
    ppapi_flash_path = path.join(__dirname, '/pepflash/libpepflashplayer.so');
} else if (process.platform == 'darwin') {
    ppapi_flash_path = path.join(__dirname, '/pepflash/PepperFlashPlayer.plugin');
}
app.commandLine.appendSwitch('ppapi-flash-path', ppapi_flash_path);
// Specify flash version, for example, v18.0.0.203
app.commandLine.appendSwitch('ppapi-flash-version', '25.0.0.127');

app.on('ready', function () {
    mainWindow = new BrowserWindow({
        'width': 1024,
        'height': 768,
        'icon': __dirname + '/favicon.ico',
        'frame': true,
        'title': "Navegador Flash",
        'webPreferences': {
            'webviewTag': true,
            'plugins': true,
            'nodeIntegration': true,
        },
    });
    mainWindow.maximize(true);
    mainWindow.setMenuBarVisibility(false);
    mainWindow.loadURL('http://www.layouts-templates.com/free-template/website-template/17.htm');
});


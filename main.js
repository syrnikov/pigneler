// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");
const path = require("node:path");
const { ipcMain } = require("electron");
const Store = require("electron-store");
const store = new Store();

// Handle asynchronous operations
ipcMain.on("save-username", (event, username) => {
  store.set("username", username);
});

// Respond with username when requested
ipcMain.on("init-store", (event) => {
  const username = store.get("username");
  event.sender.send("username-loaded", username);
});
function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 880,
    height: 600,
    minWidth: 880,
    minHeight: 600,
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const { app, BrowserWindow } = require("electron"); // Импорт модулей

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 800,
  });

  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();
});

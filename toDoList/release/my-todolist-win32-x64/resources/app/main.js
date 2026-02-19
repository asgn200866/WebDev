// main.js - Главный процесс

// Подключаем необходимые модули Electron
const { app, BrowserWindow, ipcMain } = require("electron");
// Подключаем модуль для работы с путями файлов (встроен в Node.js)
const path = require("path");
// Подключаем наше будущее хранилище
const Store = (() => {
  try {
    return require("electron-store").default;
  } catch {
    return require("electron-store");
  }
})();

// Сразу инициализируем хранилище для данных (создаст файл config.json в папке приложения)
const store = new Store({
  // Зададим начальные значения по умолчанию
  defaults: {
    todos: [], // Пока список задач пуст
  },
});

// Функция для создания главного electron-store
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // ВАЖНО ДЛЯ НОВИЧКА: Это включает интеграцию с Node.js в окне.
      // В реальных проектах для безопасности используют preload-скрипты,
      // но для первого шага и простоты - самое то.
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Загружаем в окно наш HTML файл
  win.loadFile("index.html");

  // Открыть инструменты разработчика (необязательно, но удобно)
  // win.webContents.openDevTools();
}

// Событие 'ready' срабатывает, когда Electron завершил инициализацию
app.whenReady().then(() => {
  createWindow();

  // Слушаем событие 'get-todos' от окна (когда ему нужно загрузить список)
  ipcMain.handle("get-todos", () => {
    return store.get("todos"); // Возвращаем сохраненные задачи
  });

  // Слушаем событие 'save-todos' для сохранения нового списка
  ipcMain.handle("save-todos", (event, todos) => {
    store.set("todos", todos); // Сохраняем задачи в файл
    return true;
  });
});

// Закрываем приложение, когда все окна закрыты (кроме macOS)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Для macOS: создать окно, если ни одного нет (например, при клике на иконку в доке)
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

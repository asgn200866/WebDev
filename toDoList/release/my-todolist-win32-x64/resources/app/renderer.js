// renderer.js - Процесс отрисовки

// Импорт ipcRenderer
const { ipcRenderer } = require("electron");

// Находим элементы на странице
const todoList = document.getElementById("todoList");
const newTodoInput = document.getElementById("newTodoInput");
const addTodoBtn = document.getElementById("addTodoBtn");

// Функция для отображения списка задач
function renderTodos(todos) {
  todoList.innerHTML = ""; // Очищаем список
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <span>${todo}</span>
            <button class="delete-btn" data-index="${index}">Удалить</button>
        `;
    todoList.appendChild(li);
  });

  // Добавляем обработчики на кнопки удаления
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      deleteTodo(index);
    });
  });
}

// Загружаем задачи при запуске
async function loadTodos() {
  // Вызываем API главного процесса (которое мы создали в main.js)
  const todos = await ipcRenderer.invoke("get-todos");
  renderTodos(todos);
}

// Сохраняем задачи
async function saveTodos(todos) {
  await ipcRenderer.invoke("save-todos", todos);
}

// Добавление новой задачи
async function addTodo() {
  const newTodo = newTodoInput.value.trim();
  if (!newTodo) return;

  // Получаем текущий список
  const currentTodos = await ipcRenderer.invoke("get-todos");
  // Добавляем новую задачу
  const updatedTodos = [...currentTodos, newTodo];
  // Сохраняем
  await saveTodos(updatedTodos);
  // Обновляем отображение
  renderTodos(updatedTodos);
  // Очищаем поле ввода
  newTodoInput.value = "";
}

// Удаление задачи
async function deleteTodo(index) {
  const currentTodos = await ipcRenderer.invoke("get-todos");
  // Удаляем задачу по индексу
  const updatedTodos = currentTodos.filter((_, i) => i != index);
  await saveTodos(updatedTodos);
  renderTodos(updatedTodos);
}

// Навешиваем обработчики событий
addTodoBtn.addEventListener("click", addTodo);
newTodoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTodo();
});

// Загружаем задачи при старте
loadTodos();

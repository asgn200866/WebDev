const labelTextTasks = document.getElementsByClassName("tasks-input"); // HTMLcollection for tasks
const inputElement = document.querySelector(".tasks-input"); // Получение обьекта инпут для запуска обработчика
const elColumnTasks = document.getElementById("tasksText"); // DOMelement tasks

let taskArrOb = [];

/*
let fragmentTasksMain = document.createElement("div");
fragmentTasksMain.className = "label-text-tasks";
fragmentTasksMain.innerHTML = `<input type="checkbox" class="tasks-cb"><input type="text" class="tasks-input">`;
elColumnTasks.insertAdjacentElement("beforeend", fragmentTasksMain);
*/

console.log(labelTextTasks);

function TaskArr(text) {
  this.text = text;
} // Обьект tasks

elColumnTasks.addEventListener("input", saveTextTasks); // Прослушивание ввода для теста

function saveTextTasks() {
  var lastFragment = labelTextTasks[labelTextTasks.length - 1]; // Получение последнего элемента
  textTasksValue = lastFragment.value; // Получение текста из последнего обьекта

  if (textTasksValue != "") {
    let fragmentTasksMain = document.createElement("div");
    fragmentTasksMain.className = "label-text-tasks";
    fragmentTasksMain.innerHTML = `<input type="checkbox" class="tasks-cb"><input type="text" class="tasks-input">`;
    elColumnTasks.insertAdjacentElement("beforeend", fragmentTasksMain);

    const taskObject = new TaskArr(textTasksValue);
    taskArrOb.push(TaskArr);
    console.log(taskArrOb);
  }
}

/* Надо создать первый обьект, что бы потом сканить его как последний. Есть варик пере
смотреть структуру иф елсе, что бы разделить создание обьекта и добавление ДОМ элемента
в разные функции, но тогда будут траблы с их связкой. Можно попробывать продолжать 
попытки активировать обработчик единожды. Есть более пещерный, но рабочий способ - 
расписать функцию первой строки в отдельную функцию*/

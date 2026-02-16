const labelTextTasks = document.getElementsByClassName("tasks-input"); // HTMLcollection for tasks
const elColumnTasks = document.getElementById("tasksText"); // DOMelement tasks
const lastFragment = labelTextTasks[labelTextTasks - 1]; // Получение последнего элемента
/*
let fragmentTasksMain = document.createElement("div"); 
fragmentTasksMain.className = "label-text-tasks";
fragmentTasksMain.innerHTML = `<input type="checkbox" class="tasks-cb"><input type="text" class="tasks-input">`;
elColumnTasks.insertAdjacentElement("beforeend", fragmentTasksMain);
создание прототипа, не обьект
*/
console.log(lastFragment);
console.log(labelTextTasks);

function TaskArr(text, index) {
  this.text = text;
  this.index = index;
} // Обьект tasks

lastFragment.addEventListener("input", saveTextTasks);

function saveTextTasks() {
  var textTasksValue = lastFragment.textContent; // Получение текста из последнего обьекта
}

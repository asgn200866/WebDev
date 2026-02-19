const labelTextTasksInput = document.getElementsByClassName("tasks-input"); // HTMLcollection for tasks input
const tasksChekbox = document.getElementsByClassName("tasks-cb"); // HTMLcollection for tasks chekbox
const elColumnTasks = document.getElementById("tasksText"); // DOMelement tasks

let taskArrOb = [];

function createTasksEl() {
  let fragmentTasksMain = document.createElement("div");
  fragmentTasksMain.className = "label-text-tasks";
  fragmentTasksMain.innerHTML = `<input type="checkbox" class="tasks-cb"><input type="text" class="tasks-input">`;
  elColumnTasks.insertAdjacentElement("beforeend", fragmentTasksMain);
} // Функция создания первой строки

function getTextValue() {
  var lastFragmentInput = labelTextTasksInput[labelTextTasksInput.length - 1]; // Получение последнего элемента ввода
  var textTasksValue = lastFragmentInput.value; // Получение текста из последнего обьекта
  var lastFragmentCb = tasksChekbox[tasksChekbox.length - 1]; // Получение последнего элемента ввода
  var checkTasksValue = lastFragmentCb.checked; // Получение текста из последнего обьекта

  if (textTasksValue != "") {
    const taskObject = new TaskArr(textTasksValue, checkTasksValue);
    taskArrOb.push(TaskArr);
    console.log(taskArrOb);

    createTasksEl();
  }
} // Функция создания нового объекта/элемента

function delEmptyEL() {
  const arrElTasksDel = Array.from(labelTextTasksInput).slice(0, -1);
  for (let i = arrElTasksDel.length - 1; i >= 0; i--) {
    let element1 = arrElTasksDel[i];
    let element2 = tasksChekbox[i];

    if (element1.value === "") {
      element1.remove();
      taskArrOb.splice(i);
      if (element2) element2.remove();
    }
  }
} // Удаление обьекта при обнулении инпута

function checkTasks() {
  const checkTasksArr = Array.from(tasksChekbox);
  for (let i = 0; i < checkTasksArr.length; i++) {
    let element1 = checkTasksArr[i];
    let element2 = labelTextTasksInput[i];

    if (element1.checked) {
      element2.style.textDecoration = "line-through";
    } else {
      element2.style.textDecoration = "none";
    }
  }
}

function TaskArr(text, cbComplected) {
  this.text = text;
  this.cbComplected = cbComplected;
} // Обьект tasks

createTasksEl(); // Создание нового обьекта tasks (вызов функции)

elColumnTasks.addEventListener("input", () => {
  getTextValue();
  delEmptyEL();
}); // Прослушивание ввода для теста

elColumnTasks.addEventListener("change", checkTasks);

function saveTextTasks() {
  getTextValue();
  delEmptyEL();
} // Функция обработчика событий tasks

/* Надо создать первый обьект, что бы потом сканить его как последний. Есть варик пере
смотреть структуру иф елсе, что бы разделить создание обьекта и добавление ДОМ элемента
в разные функции, но тогда будут траблы с их связкой. Можно попробывать продолжать 
попытки активировать обработчик единожды. Есть более пещерный, но рабочий способ - 
расписать функцию первой строки в отдельную функцию*/

/* После создания этой функции, лучше сразу создать выгрузку в конфиг и узнать как
создать LocalStorage. Сразу рассмотреть возможности создания декстопа, что бы 
исключить конфликты методов и синтаксисов. Касательно текста выше, используем 
функцию создания нулевого обьекта, который будет помещен в тот же массив. Требуется
реализовать логику проверку всего массива на обнуление строки и последующие удаление.
В лучшем случае по активности инпута выбирать объект и с ним проводить функции */

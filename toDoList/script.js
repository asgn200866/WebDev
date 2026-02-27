const labelTextTasksInput = document.getElementsByClassName('tasks-input'); // HTMLcollection for tasks input
const tasksChekbox = document.getElementsByClassName('tasks-cb'); // HTMLcollection for tasks chekbox
const elColumnTasks = document.getElementById('tasksText'); // DOMelement tasks

const labelNodeadlineInput = document.getElementsByClassName('nodeadline-input');
const nodeadlineChekbox = document.getElementsByClassName('nodeadline-cb');
const elColumnNodeadline = document.getElementById('nodeadlineText');

/**
 * const collectonInput = document.getElementsByClassName(className) -- HTMLcollection for tasks input
 * const collectonCheckbox = document.getElementsByClassName(className) -- HTMLcollection for tasks chekbox
 * const elementInDocument = document.getElementById(valueID) -- Получение обьекта для позиционирования в документе
 */

/*Импорт необходимых компонентов из документа HTML*/

let taskArrOb = [];
let nodeadlineArrOb = [];

/**
 * let arrayObject = {
 *    taskArrOb: [];
 *    nodeadlineArrOb: [];
 * }
 * 
 * function addArray(item) {
 *    const typeKey = item.type;
 *    arrayObject[typeObject].push(item);
 * 
 *    if (!arrayObject[typeKey]) {
 *        console.error("Неизвестный тип: ", typeKey);
 *        return;
 *    }
 * }
}
 */
/*Создание массиво для хранения обьектов Tasks и Nodeadline*/

function createTasksEl() {
  let fragmentTasksMain = document.createElement('div');
  fragmentTasksMain.className = 'label-text-tasks';
  fragmentTasksMain.innerHTML = `<input type="checkbox" class="tasks-cb"><input type="text" class="tasks-input">`;
  elColumnTasks.insertAdjacentElement('beforeend', fragmentTasksMain);
} // Функция создания первой строки
function createNodeadlineEl() {
  let fragmentNodeadlineMain = document.createElement('div');
  fragmentNodeadlineMain.className = 'label-text-nodeadline';
  fragmentNodeadlineMain.innerHTML = `<input type="checkbox" class="nodeadline-cb"><input type="text" class="nodeadline-input">`;
  elColumnNodeadline.insertAdjacentElement('beforeend', fragmentNodeadlineMain);
} // Функция создания первой строки

/*Создание первой строки для запуска циклов и обработчиков событий*/

/**
 * function taskRow() {
 *    return '
 *    <div class="label-text-tasks">
 *      <input type="checkbox" class="tasks-cb">
 *       <input type="text" class="tasks-input">
 *     </div>';}
 *
 * function nodeadlineRow() {
 *    return '
 *    <div class-"label-text-nodeadline">
 *      <input type="checkbox" class="nodeadline-cb">
 *      <input type="text" class="nodeadline-input">
 *    </div>';}
 * }
 *
 *
 * const uiMap = {
 *    tasks: taskRow;
 *    nodeadline: nodeadlineRow;
 * };
 *
 * function insertElement(type) {
 * const elementFactory = uiMap[type];
 *
 * }
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

function getTextValueTasks() {
  var lastFragmentInput = labelTextTasksInput[labelTextTasksInput.length - 1]; // Получение последнего элемента ввода
  var textTasksValue = lastFragmentInput.value; // Получение текста из последнего обьекта
  var lastFragmentCb = tasksChekbox[tasksChekbox.length - 1]; // Получение последнего элемента ввода
  var checkTasksValue = lastFragmentCb.checked; // Проверка чб из последнего обьекта

  console.log(textTasksValue);

  if (textTasksValue != '') {
    const taskObject = new TaskArr(textTasksValue, checkTasksValue);
    taskArrOb.push(taskObject);
    consoleMessage();

    // createTasksEl();
  }
} // Функция создания нового объекта/элемента
function getTextValueNodeadline() {
  var lastFragmentInput = labelNodeadlineInput[labelNodeadlineInput.length - 1]; // Получение последнего элемента ввода
  var textNodeadlineValue = lastFragmentInput.value; // Получение текста из последнего обьекта
  var lastFragmentCb = nodeadlineChekbox[nodeadlineChekbox.length - 1]; // Получение последнего элемента ввода
  var checkNodeadlineValue = lastFragmentCb.checked; // Получение текста из последнего обьекта

  if (textNodeadlineValue != '') {
    const nodeadlineObject = new NodeadlineArr(textNodeadlineValue, checkNodeadlineValue);
    nodeadlineArrOb.push(nodeadlineObject);
    consoleMessage();

    createNodeadlineEl();
  }
}

/*Функции создания новых объектов для активации в обработчике*/

function delEmptyELTasks() {
  const arrElTasksDel = Array.from(labelTextTasksInput).slice(0, -1);
  for (let i = arrElTasksDel.length - 1; i >= 0; i--) {
    let element1 = arrElTasksDel[i];
    let element2 = tasksChekbox[i];

    if (element1.value === '') {
      element1.remove();
      taskArrOb.splice(i, 1);
      consoleMessage();
      if (element2) element2.remove();
    }
  }
}
function delEmptyELNodeadline() {
  const arrElNodeadlineDel = Array.from(labelNodeadlineInput).slice(0, -1);
  for (let i = arrElNodeadlineDel.length - 1; i >= 0; i--) {
    let element1 = arrElNodeadlineDel[i];
    let element2 = nodeadlineChekbox[i];

    if (element1.value === '') {
      element1.remove();
      nodeadlineArrOb.splice(i, 1);
      consoleMessage();
      if (element2) element2.remove();
    }
  }
}

/*Обработка инпутов при их обновлении*/

function checkTasks() {
  const checkTasksArr = Array.from(tasksChekbox);
  for (let i = 0; i < checkTasksArr.length; i++) {
    let element1 = checkTasksArr[i];
    let element2 = labelTextTasksInput[i];

    if (element1.checked) {
      element2.style.textDecoration = 'line-through';
    } else {
      element2.style.textDecoration = 'none';
    }
  }
}
function checkNodeadline() {
  const checkNodeadlineArr = Array.from(nodeadlineChekbox);
  for (let i = 0; i < checkNodeadlineArr.length; i++) {
    let element1 = checkNodeadlineArr[i];
    let element2 = labelNodeadlineInput[i];

    if (element1.checked) {
      element2.style.textDecoration = 'line-through';
    } else {
      element2.style.textDecoration = 'none';
    }
  }
}

/*Связь чекбокса с инпутом для осуществления их взаимодействия*/

function TaskArr(text, cbComplected) {
  this.text = text;
  this.cbComplected = cbComplected;
}
function NodeadlineArr(text, cbComplected) {
  this.text = text;
  this.cbComplected = cbComplected;
}

/*Обьявление обьектов */

createTasksEl(); // Создание нового обьекта tasks (вызов функции)
createNodeadlineEl(); // Создание нового обьекта nodeadline (вызов функции)

/*Вызов функций создания первых объектов*/

elColumnTasks.addEventListener('input', () => {
  getTextValueTasks();
  delEmptyELTasks();
}); // Прослушивание ввода для теста
elColumnNodeadline.addEventListener('input', () => {
  getTextValueNodeadline();
  delEmptyELNodeadline();
}); // Прослушивание ввода для теста

elColumnTasks.addEventListener('change', checkTasks);
elColumnNodeadline.addEventListener('change', checkNodeadline); // Прослушивание чекбокса

/*Создание обработичков события*/

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

function consoleMessage() {
  console.clear();
  console.log(taskArrOb);
  console.log(nodeadlineArrOb);

  console.log(
    'Только текст и чекбокс задач:',
    taskArrOb.map((obj) => obj.text),
    taskArrOb.map((obj) => obj.cbComplected)
  );
  console.log(
    'Только текст дедлайнов:',
    nodeadlineArrOb.map((obj) => obj.text)
  );
} //Debug and logs

/**
 * Надо разбить логику функции getTextValueTasks на две функции. Функцию создания обьекта при заполнении пустой строки
 * и обновления переменной text в обьекте, инпут которого заполняется. Проверить логику вывода чек боксов и сохранить
 * их в переменную как булевый параметр для дальнейшего сохранения в local storage.
 * Настроить отдельный обработчик событий для обновления текста в обьекте при активации и обновлении его импута.
 *  Тоже самое с чекбоксами, нужно обновление параметра в обьекте при обновлении чек бокса от юзера.
 */

/**
 * Перед исправлением ошибок с сохранением и обновлением данных было принято решение об оптимизации кода. Требуется
 * изучить тему "Наследование". Это одна из важнейших вещей в ООП языках, и мне казалось я обойду их стороной, но нет.
 * После изучения будет практика на данном коде. Основная цель, избавиться от дублирующего кода.
 */

class TopLabel {
  constructor(text, cbCheck, id) {
    this.text = text;
    this.cbCheck = cbCheck;
    this.id = id;
  }
} // Общий класс с значениями текста и чекбокса

class Tasks extends TopLabel {
  constructor(text, cbCheck, id) {
    super(text, cbCheck, id);
  }
} // Дочерний объект задач с количество повторений

class Nodeadline extends TopLabel {
  constructor(text, cbCheck, id) {
    super(text, cbCheck, id);
  }
} // Дочерний объект свободных задач с значением срочности

const constructorKey = {
  task: {
    inputs: document.getElementsByClassName('tasks-input'),
    checkboxes: document.getElementsByClassName('tasks-cb'),
    container: document.getElementById('tasksText'),
    name: 'task',
    type: Tasks,
    baseClassName: 'label-text-tasks',
    inputClassName: 'tasks-input',
    checkboxClassName: 'tasks-cb',
    arrayObjects: [],
  },
  nodeadline: {
    type: Nodeadline,
    baseClassName: 'label-text-nodeadline',
    inputClassName: 'nodeadline-input',
    checkboxClassName: 'nodeadline-cb',
    inputs: document.getElementsByClassName('nodeadline-input'),
    checkboxes: document.getElementsByClassName('nodeadline-cb'),
    container: document.getElementById('nodeadlineText'),
    name: 'nodeadline',
    arrayObjects: [],
  },
}; // Группа для имен объектов

const groupsForEvent = [constructorKey.task, constructorKey.nodeadline];

groupsForEvent.forEach((group) => {
  group.container.addEventListener('input', (event) => {
    if (!event.target.matches('input[type="text"]')) return;
    const valuesTargetElement = getValue(event);
    updateObject(group, valuesTargetElement);
    deleteElement(group, valuesTargetElement, event);
    messageLog();
  });
  group.container.addEventListener('change', (event) => {
    if (!event.target.matches('input[type="checkbox"]')) return;
    checkboxUpdateStyle(group, event);
    messageLog();
  });
}); // Обработчик событий

function getValue(event) {
  const currentElement = event.target;
  const cardElement = currentElement.closest('[data-id]');
  const inputElement = currentElement.closest('input[type="text"]');
  const checkboxElement = cardElement.querySelector('input[type="checkbox"]');
  const checkboxObject = checkboxElement.checked;
  const inputId = cardElement.dataset.id;
  const inputObject = inputElement.value;

  return { inputId, inputObject, checkboxObject, cardElement };
}

function createEl(baseClassName, columnElement, inputClassName, checkboxClassName) {
  const fragmentMain = document.createElement('div');
  fragmentMain.className = baseClassName;
  const idElement = crypto.randomUUID();
  fragmentMain.innerHTML = `
  <input type="checkbox" class= ${checkboxClassName}>
    <input type="text" class= ${inputClassName}>`;
  fragmentMain.dataset.id = idElement;
  columnElement.insertAdjacentElement('beforeend', fragmentMain);
} // Функция создания новых DOM элементов в документе

createEl(
  constructorKey.task.baseClassName,
  constructorKey.task.container,
  constructorKey.task.inputClassName,
  constructorKey.task.checkboxClassName
); // Создание первого элемента задач

createEl(
  constructorKey.nodeadline.baseClassName,
  constructorKey.nodeadline.container,
  constructorKey.nodeadline.inputClassName,
  constructorKey.nodeadline.checkboxClassName
); // Создания первого элемента задач без крайнего срока

function createObject(group, valuesTargetElement) {
  const inputId = valuesTargetElement.inputId;
  const inputValue = valuesTargetElement.inputObject;
  const checkboxValue = valuesTargetElement.checkboxObject;
  const config = constructorKey[group.name];
  const nameObject = config.type;

  const objectClass = new nameObject(inputValue, checkboxValue, inputId);
  config.arrayObjects.push(objectClass);
  const ValueId = objectClass.id;
  return { objectClass, ValueId };
} // Создание объекта и добавление его в массив

function checkboxUpdateStyle(group, event) {
  const config = constructorKey[group.name];
  const idArray = config.arrayObjects;
  const currentElement = event.target;
  const cardElement = currentElement.closest('[data-id]');
  const inputId = cardElement.dataset.id;
  const realId = idArray.find((item) => item.id === inputId);
  const checkboxElement = cardElement.querySelector('input[type="checkbox"]');
  const checkboxObject = checkboxElement.checked;

  if (checkboxObject) {
    cardElement.style.textDecoration = 'line-through';
  } else {
    cardElement.style.textDecoration = 'none';
  }

  if (realId) {
    realId.cbCheck = checkboxObject;
  }
} // Изменение стиля текста при активации чекбокса и обновление чекбокса в объекте

function updateObject(group, valuesTargetElement) {
  const config = constructorKey[group.name];
  const idArray = config.arrayObjects;
  const checkId = valuesTargetElement.inputId;
  const realId = idArray.find((item) => item.id === checkId);
  const inputObject = valuesTargetElement.inputObject;

  if (realId) {
    realId.text = inputObject;
  } else {
    createEl(
      config.baseClassName,
      config.container,
      config.checkboxClassName,
      config.inputClassName
    );
    createObject(group, valuesTargetElement);
  }
} // Редактирование объекта и создание объекта/DOM элемента

function deleteElement(group, valuesTargetElement) {
  const config = constructorKey[group.name];
  const checkId = valuesTargetElement.inputId;
  const inputObject = valuesTargetElement.inputObject;
  const cardElement = valuesTargetElement.cardElement;

  if (inputObject == '') {
    config.arrayObjects = config.arrayObjects.filter((item) => item.id !== checkId);
    cardElement.remove();
  }
} // Проверка и удаление пустых обьектов

function messageLog() {
  console.clear();
  console.table(constructorKey.task.arrayObjects);
  console.table(constructorKey.nodeadline.arrayObjects);
} // Логирование массивов

class ObjectClass {
  constructor(text, id) {
    this.text = text;
    this.id = id;
  }
} // Общий класс задач с значениями текста и чекбокса

function createSubclass() {
  return class extends ObjectClass {
    constructor(text, cbCheck, id) {
      super(text, id);
      this.cbCheck = cbCheck;
    }
  };
} // Функция создания задач ObjectClass

const daysWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
// Ключи для дней календаря в constructorKey

const constructorKey = {
  task: {
    name: 'task',
    type: 'Tasks',
    baseClassName: 'label-text-tasks',
    inputClassName: 'tasks-input',
    checkboxClassName: 'tasks-cb',
    inputs: document.getElementsByClassName('tasks-input'),
    checkboxes: document.getElementsByClassName('tasks-cb'),
    container: document.getElementById('tasksText'),
    arrayObjects: [],
  },
  nodeadline: {
    name: 'nodeadline',
    type: 'Nodeadline',
    baseClassName: 'label-text-nodeadline',
    inputClassName: 'nodeadline-input',
    checkboxClassName: 'nodeadline-cb',
    inputs: document.getElementsByClassName('nodeadline-input'),
    checkboxes: document.getElementsByClassName('nodeadline-cb'),
    container: document.getElementById('nodeadlineText'),
    arrayObjects: [],
  },
  ...Object.fromEntries(
    daysWeek.map((day) => [
      day,
      {
        name: day,
        type: day.charAt(0).toUpperCase() + day.slice(1),
        baseClassName: `label-text-${day}`,
        inputClassName: `${day}-input`,
        checkboxClassName: 'checkbox-day-week',
        inputs: document.getElementsByClassName(`${day}-input`),
        checkboxes: document.getElementsByClassName('checkbox-day-week'),
        container: document.getElementById(`${day}Text`),
        arrayObjects: [],
      },
    ])
  ),
}; // Группа для имен объектов

const groupsForEvent = Object.values(constructorKey); // Массив для перебора групп объектов

groupsForEvent.forEach((group) => {
  group.container.addEventListener('input', (event) => {
    if (!event.target.matches('input[type="text"]')) return;
    const valuesTargetElement = getValue(event, group);
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

function getValue(event, group) {
  const currentElement = event.target;
  const cardElement = currentElement.closest('[data-id]');
  const inputElement = currentElement.closest('input[type="text"]');
  const inputId = cardElement.dataset.id;
  const inputObject = inputElement.value;
  cardElement.querySelector('input[type="checkbox"]');
  const checkboxElement = cardElement.querySelector('input[type="checkbox"]');
  const checkboxObject = checkboxElement.checked;
  return { inputId, inputObject, checkboxObject, cardElement };
} // Функция получение данных из HTML в реальном времени

function createElement(group) {
  const config = constructorKey[group.name];
  const fragmentMain = document.createElement('div');
  fragmentMain.className = config.baseClassName;
  const idElement = crypto.randomUUID();
  fragmentMain.innerHTML = `
  <input type="checkbox" class= ${config.checkboxClassName}>
    <input type="text" class= ${config.inputClassName}>`;
  fragmentMain.dataset.id = idElement;

  config.container.insertAdjacentElement('beforeend', fragmentMain);
} // Функция создания элементов

groupsForEvent.forEach((group) => {
  createElement(group);
}); // Создание первых элементов

function createObject(group, valuesTargetElement) {
  const inputId = valuesTargetElement.inputId;
  const inputValue = valuesTargetElement.inputObject;
  const checkboxValue = valuesTargetElement.checkboxObject;
  const config = constructorKey[group.name];
  const nameObject = createSubclass();

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
  const checkboxObject = currentElement.checked;
  const inputElement = cardElement.querySelector('input[type="text"]');
  if (checkboxObject) {
    inputElement.style.textDecoration = 'line-through';
  } else {
    inputElement.style.textDecoration = 'none';
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
    createElement(group);
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
  groupsForEvent.forEach((group) => {
    const config = group.arrayObjects;
    console.table(group.arrayObjects);
  });
} // Логирование массивов

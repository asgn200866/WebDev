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
    const valuesTargetElement = getValue(event);
    updateObject(group, valuesTargetElement);
    messageLog();
  });
  group.container.addEventListener('change', (event) => {
    const valuesTargetElement = getValue(event);
    updateObject(group, valuesTargetElement);
    messageLog();
  });
}); // Обработчик событий

function getValue(event) {
  const currentElement = event.target;
  const cardElement = currentElement.closest('[data-id]');
  const inputElement = currentElement.closest('input[type="text"]');
  const inputId = cardElement.dataset.id;
  const inputObject = inputElement.value;
  const checkboxObject = currentElement.checked;

  console.clear();
  console.log(inputObject);
  /*   console.log(inputElement);
  console.log(checkboxElement);
  console.log(currentElement);
  console.log(cardElement); */

  return { inputId, inputObject, checkboxObject };
}

function creatEl(baseClassName, columnElement, inputClassName, checkboxClassName) {
  const fragmentMain = document.createElement('div');
  fragmentMain.className = baseClassName;
  const idElement = crypto.randomUUID();
  fragmentMain.innerHTML = `
  <input type="checkbox" class= ${checkboxClassName}>
    <input type="text" class= ${inputClassName}>`;
  fragmentMain.dataset.id = idElement;
  columnElement.insertAdjacentElement('beforeend', fragmentMain);
} // Функция создания новых DOM элементов в документе

creatEl(
  constructorKey.task.baseClassName,
  constructorKey.task.container,
  constructorKey.task.inputClassName,
  constructorKey.task.checkboxClassName
); // Создание первого элемента задач

creatEl(
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

function updateObject(group, valuesTargetElement) {
  const config = constructorKey[group.name];
  const idArray = config.arrayObjects;
  const checkId = valuesTargetElement.inputId;
  const realId = idArray.find((item) => item.id === checkId);
  const inputObject = valuesTargetElement.inputObject;
  const checboxObject = valuesTargetElement.checkboxObject;

  if (realId) {
    realId.text = inputObject;
    realId.cbCheck = checboxObject;
  } else {
    creatEl(
      config.baseClassName,
      config.container,
      config.checkboxClassName,
      config.inputClassName
    );
    createObject(group, valuesTargetElement);
  }
} // Редактирование объекта

function messageLog() {
  /*   console.clear();
  console.log(constructorKey.task.arrayObjects);
  console.log(constructorKey.nodeadline.arrayObjects); */
} // Логирование массивов

/*   if (checboxObject == 'true') {
    currentElementInput.style.textDecoration = 'line-through';
    console.log('true');
  } else if (checboxObject == 'false') {
    currentElementInput.style.textDecoration = 'none';
    console.log('false');
  } */

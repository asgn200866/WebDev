const taskGroup = {
  inputs: document.getElementsByClassName('tasks-input'),
  checkboxes: document.getElementsByClassName('tasks-cb'),
  container: document.getElementById('tasksText'),
}; // Группа для задач и ключей к различным данным

const nodeadlineGroup = {
  inputs: document.getElementsByClassName('nodeadline-input'),
  checkboxes: document.getElementsByClassName('nodeadline-cb'),
  container: document.getElementById('nodeadlineText'),
}; // Группа для свободных задач и ключей к различным данным

class TopLabel {
  constructor(text, cbCheck) {
    this.text = text;
    this.cbCheck = cbCheck;
  }
} // Общий класс с значениями текста и чекбокса

class Tasks extends TopLabel {
  constructor(text, cbCheck, reps) {
    super(text, cbCheck);
    this.reps = reps;
  }
} // Дочерний объект задач с количество повторений

class Nodeadline extends TopLabel {
  constructor(text, cbCheck, stringency) {
    super(text, cbCheck);
    this.stringency = stringency;
  }
} // Дочерний объект свободных задач с значением срочности

function creatEl(baseClassName, columnElement) {
  let fragmentMain = document.createElement('div');
  fragmentMain.className = baseClassName;
  fragmentMain.innerHTML = `
    <input type="checkbox" class= ${baseClassName}>
    <input type="text" class= ${baseClassName}>`;
  columnElement.insertAdjacentElement('beforeend', fragmentMain);
} // Функция создания новых DOM элементов в документе

creatEl('label-text-tasks', taskGroup.container);
creatEl('label-text-nodeadline', nodeadlineGroup.container);
/*
function getVulue(collInputs, collCheckboxes) {
  const inputsArr = Array.from(collInputs);
  const checkboxesArr = Array.from(collCheckboxes);

  const inputObject = inputsArr[inputsArr.length - 1];
  const checboxObject = checkboxesArr[checkboxesArr.length - 1];
}

https://chat.deepseek.com/a/chat/s/beecf82c-fd4f-4156-97b0-3253e3edacda -- полиморфизм */

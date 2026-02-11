/* element = document.getElementById(id); => Вызывает элемент по его ID
 * element = document.querySelector(selectors); => Вызывает первый элемент, совпадающий 
        по селектору. Возвращает null, если ничего не найдено. 
 * elementList = document.querySelectorAll(selectors); => Возвращает статический NodeList.
 *      NodeList - статическая таблица не является массивом, содержит в себе все элементы, 
 *      совпадающие селектору. Возвращает пустой NodeList, если ничего не найдено. 
 * document.getElementsByClassName() => Возвращает итерируемый объект всех дочерних классов
 *      указанного элемента. 
 * var elements = document.getElementsByTagName(name); => Возвращает HTMLCollection элементов
 * с указаным именем тега. Поиск осуществляется по всему документу, включая корневой узел.
 * —————————————————————————————————————————————————————————————————————————————————————————————————
 * var text = element.textContent;
 *     element.textContent = "Это просто текст";
 * Возвращает текстовое значение элемента, позволяя менять его. 
 * —————————————————————————————————————————————————————————————————————————————————————————————————
 * const content = element.innerHTML;
 * element.innerHTML = htmlString;
 *     Возвращает DOMString, которая содержит части HTML разметки. Позволяет менять ее или удалять. 
 * element.style и element.classList аналогичны методу выше, но используется для стилей и классов.
 * setAttribute(name, value) => Позволяет менять определенный атрибут элемента. 
 * —————————————————————————————————————————————————————————————————————————————————————————————————
 * //События:
 * target.addEventListener('click', listener [, options]); => Основной способ привязки функции 
 * к нажатию на DOM элемент. Позволяет выполнить handler при клике. 
 *     target - строка или имя события. 
 *     listener (handler) - функция, которая вызывается при возникновении события.
 * Аналогичные методы с 'input' и 'submit'.
 *     'submit' - позволяет валидировать отправку форм, не перезагружая страницу.
 *     'input' - позволяет выполнять функцию при каждом изменении окна ввода. 
 * —————————————————————————————————————————————————————————————————————————————————————————————————
 */

const bgButton = document.getElementById(`bg-color`);
const bgFonColor = document.querySelector(`.current`);
const inputArea = document.querySelector(`.inputUser`);
const outputArea = document.querySelector(`.outputUser`);
const submitBtn = document.querySelector(`.submitInput`);
const submitForm = document.querySelector(`.formSubmit`);

let fladBtnPush = true;

bgButton.addEventListener("click", changeColor);

function changeColor(event) {
  if (fladBtnPush) {
    bgFonColor.style.backgroundColor = "var(--bg--var--btn--fon)";
    bgButton.style.border = "solid 5px var(--btn--color--input--bg)";
    bgButton.style.backgroundColor = "var(--bg-btn--red)";
    submitBtn.style.backgroundColor = "var(--bg-btn--red)";
    inputArea.style.backgroundColor = "var(--btn--color--input--bg)";
    outputArea.style.backgroundColor = "var(--btn--color--input--bg)";
    inputArea.style.border = "solid 2px var(--btn--color--input--bg)";
    outputArea.style.border = "solid 2px var(--btn--color--input--bg)";
    submitBtn.style.border = "solid 5px var(--btn--color--input--bg)";
    outputArea.style.color = "var(--text--color--red)";
    inputArea.style.color = "var(--text--color--red)";
  } else {
    bgFonColor.style.backgroundColor = "var(--bg--fon)";
    bgButton.style.border = "solid 5px var(--input--bg)";
    bgButton.style.backgroundColor = "var(--bg-btn--blue)";
    submitBtn.style.backgroundColor = "var(--bg-btn--blue)";
    inputArea.style.backgroundColor = "var(--input--bg)";
    outputArea.style.backgroundColor = "var(--input--bg)";
    inputArea.style.border = "solid 2px var(--input--bg)";
    outputArea.style.border = "solid 2px var(--input--bg)";
    submitBtn.style.border = "solid 5px var(--input--bg)";
    outputArea.style.color = "var(--text--color--blue)";
    inputArea.style.color = "var(--text--color--blue)";
  }
  fladBtnPush = !fladBtnPush;
}

inputArea.addEventListener("input", textTracker);

function textTracker(event) {
  outputArea.textContent = inputArea.value;
}

submitForm.addEventListener("submit", formAccepted);

function formAccepted(event) {
  alert("Whish accepted!");
}

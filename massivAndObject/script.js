/**
 * фильты: от младшего к старшему, по возрастная группа
 * книга может иметь параметр: количество страниц, автор, название
 * метод: книга читается
 */

let users = [];

function Users(name, age) {
  this.name = name;
  this.age = age;
}

while (true) {
  const name = prompt("Введите имя пользователя");
  if (name === null) break;

  const age = +prompt("Введите возраст указанного пользователя");
  const validUsers = users.filter((user) => !isNaN(user.age) && user.age >= 0);
  if (age === null) break;

  var user = new Users(name, age);

  users.push(user);
}

console.table(users);

console.log(`Пользователи по старшинству: `);
const oldUsers = users.slice().sort((a, b) => b.age - a.age);
console.table(oldUsers);

const childrenUsers = users.filter((user) => user.age <= 17);
const childrenNames = childrenUsers.map((user) => user.name);
console.log(`Дети: `, childrenNames);

const youthUsers = users.filter((user) => user.age >= 18 && user.age <= 44);
const youthNames = youthUsers.map((user) => user.name);
console.log(`Молодые: `, youthNames);

const averageUsers = users.filter((user) => user.age >= 45 && user.age <= 59);
const averageNames = averageUsers.map((user) => user.name);
console.log(`Средний возраст: `, averageNames);

const elderlyUsers = users.filter((user) => user.age >= 60 && user.age <= 74);
const elderlyNames = elderlyUsers.map((user) => user.name);
console.log(`Пожилые: `, elderlyNames);

const centenariansUsers = users.filter((user) => user.age >= 75);
const centenariansNames = centenariansUsers.map((user) => user.name);
console.log(`Долгожители: `, centenariansNames);

alert(`Отлично! Теперь мы прочтем книгу!`);

function Book(author, pageQuantity, printData) {
  this.author = author;
  this.pageTotal = pageTotal;
  this.pagesLeft = pagesLeft;
  this.nameBook = nameBook;
}

const author = prompt(`Введите автора книги`);
const nameBook = prompt(`Введите название книги`);
let pageTotal = +prompt(`Введите количество страниц`);
let pagesLeft = pageTotal;

const bookUsers = new Book(author, pageTotal);

while (true) {
  if (bookUsers.pagesLeft != 0) {
    var pagesRead = +prompt(`Введите количество прочитанных страниц`);
  }

  if (pagesRead <= bookUsers.pagesLeft) {
    bookUsers.pagesLeft -= pagesRead;
    alert(`Страниц осталось прочесть: ${bookUsers.pagesLeft}`);
  } else if (pagesRead > bookUsers.pagesLeft && bookUsers.pagesLeft != 0) {
    alert(`Не может быть прочитано больше страниц, чем осталось!`);
    continue;
  } else if (bookUsers.pagesLeft === 0) {
    alert(
      `Автор книги: ${bookUsers.author}. Название книги: "${bookUsers.nameBook}". Книга полностью прочитана!`,
    );
    break;
  }
}

/* Array:
 * const array = [itemA, itemB, itemC...] => Объявление массива.
 * —————————————————————————————————————————————————————————————————————————————————————————————————
 * let item = array[index] => Считывает и передает первый элемент массива в переменную
 * consol.log(array.length); => Покажет в консоли длинную массива. Если методу array.lenth
 *      определенное число, он урежет/увеличит массив.
 * array.forEach((item, index, array) => { ... }); => Перебирает и производит действие с каждым
 *      элементом в массиве. Не создает новый массив.
 * array.push(itemA, itemB); => Добавляет элемент в конец массива
 * array.pop(); => Удаление из массива последнего элемента/ Не принимает параметры
 * array.shift(item); => Удаляет первый элемент из массива, и возвращает его
 * array.unshift(item); => Вставляет элемент в начало массива
 * array.slice(start, end); => Создает новый массив, с копией фрагмента из существующего
 * array.splice(start, deletCount, itemA, itemB..) => Мутирует массив, согласно условиям
 * —————————————————————————————————————————————————————————————————————————————————————————————————
 * const newArray = array.map(function(element, index, array) {
 *      return newElement;
 *      });
 * Создает новый массив, применяя функцию к каждому элементу существующего. Передавать в функцию
 * нужно только используемое значение (element, index или array).
 * —————————————————————————————————————————————————————————————————————————————————————————————————
 * const newArray = array.filter(function(element, index, array) {
 *      return true\false;
 *      });
 * Создает новый массив, проверив каждый элемент по условиям функции (отфильтровав). В новом массиве
 * остаются элементы со значением true, в противном случае элементы удаляются. Передавать в функцию
 * нужно только используемое значение (element, index или array).
 * —————————————————————————————————————————————————————————————————————————————————————————————————
 * array.reduce(function(interimResult, element, index, array) {
 *      return newInterimResult;
 *      }, startValue);
 * Приводит все элементы значения к одному значению (редуцирует). Передавать в функцию
 * нужно только используемое значение (element, index или array). Кроме переменной interimResult
 * обязана быть вторая переменная, так как первая используется для хранения получаемых в ходе
 * выполнения функций данных. Если не указать переменную startValue, она будет равна первому
 * элементу массива, обработка начнется со второго элемента. startValue - это начальное значение
 * промежуточного результата (interimResult).
 */

/* Object:
 * const object = { key: value} => Создает объект. key представляет собой свойство, которое имеет
 * какое либо значение (value).
 * —————————————————————————————————————————————————————————————————————————————————————————————————
 * console.log(object.key); => console.log указано для примера. Конструкция позволяет получить
 * доступ к свойству объекта. Если свойство имеет пробелы, спецсимволы, переменные, то key должно
 * быть заключено в [`...`].
 * —————————————————————————————————————————————————————————————————————————————————————————————————
 * function Object(item1, item2, item3) {
 *    this.item1 = item1;
 *    this.item2 = item2;
 *    this.item3 = item3;
 *    }
 *    =>
 * var newObject = new Object(value1, value2, value3);
 * Функция конструктора объекта позволяет создавать "шаблон", который потом используется для создания
 * нового объекта. Количество новых объектов не ограничено.
 */

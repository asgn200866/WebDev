// Данные для теории
const theoryData = {
  conditions: {
    title: "Условия if/else",
    content: `
            <h3>Базовый синтаксис:</h3>
            <p><span class="highlight">if (условие) { ... }</span> - выполнить код, если условие истинно</p>
            
            <h3>Дополнительные условия:</h3>
            <p><span class="highlight">else if (условие) { ... }</span> - проверить дополнительное условие, если первое ложно</p>
            <p><span class="highlight">else { ... }</span> - выполнить код, если все условия ложны</p>
            
            <h3>Тернарный оператор:</h3>
            <p><span class="highlight">условие ? да : нет</span> - компактная запись простого if/else</p>
            
            <h3>Switch/case:</h3>
            <p><span class="highlight">switch (выражение) { case значение: ... }</span> - выбор из множества вариантов</p>
            <p>Используйте <span class="highlight">break</span> для выхода из case</p>
            <p>Используйте <span class="highlight">default</span> для обработки остальных случаев</p>
        `,
  },
  calculator: {
    title: "Калькулятор",
    content: `
            <h3>Практика: калькулятор с выбором операции</h3>
            <p>В этом задании мы используем <span class="highlight">switch/case</span> для реализации калькулятора с четырьмя операциями:</p>
            <ul>
                <li>Сложение (+)</li>
                <li>Вычитание (-)</li>
                <li>Умножение (*)</li>
                <li>Деление (/)</li>
            </ul>
            <p>Для каждой операции создается отдельный <span class="highlight">case</span> в конструкции switch.</p>
            <p>При делении важно проверять деление на ноль, чтобы избежать ошибки.</p>
        `,
  },
  cycles: {
    title: "Циклы",
    content: `
            <h3>Виды циклов:</h3>
            <p><span class="highlight">for</span> - цикл с счётчиком, используется когда известно количество итераций</p>
            <p><span class="highlight">while</span> - цикл с условием, выполняется пока условие истинно</p>
            <p><span class="highlight">do...while</span> - цикл с постусловием, всегда выполняется хотя бы один раз</p>
            
            <h3>Управление циклами:</h3>
            <p><span class="highlight">break</span> - немедленный выход из цикла</p>
            <p><span class="highlight">continue</span> - пропуск текущей итерации, переход к следующей</p>
            
            <h3>Бесконечные циклы:</h3>
            <p>Будьте осторожны, чтобы не создать бесконечный цикл (например, <span class="highlight">while(true)</span> без break).</p>
        `,
  },
  guessGame: {
    title: "Игра 'Угадай число'",
    content: `
            <h3>Алгоритм игры:</h3>
            <ol>
                <li>Генерируем случайное число от 1 до 10</li>
                <li>Даем пользователю 3 попытки угадать число</li>
                <li>После каждой попытки даем подсказку (больше/меньше)</li>
                <li>Если число угадано - поздравляем</li>
                <li>Если попытки закончились - сообщаем загаданное число</li>
            </ol>
            
            <h3>Используемые концепции:</h3>
            <p><span class="highlight">Math.random()</span> - генерация случайного числа</p>
            <p><span class="highlight">while</span> или <span class="highlight">for</span> - цикл для обработки попыток</p>
            <p><span class="highlight">if/else</span> - проверка введенного числа</p>
            <p><span class="highlight">break</span> - выход из цикла при угадывании</p>
        `,
  },
  numbers: {
    title: "Числовые задания",
    content: `
            <h3>Практические задания:</h3>
            <p>1. <span class="highlight">Вывод чисел от 1 до 100</span> - используйте цикл for</p>
            <p>2. <span class="highlight">Вывод только чётных чисел</span> - два подхода:</p>
            <ul>
                <li>Использовать условие <span class="highlight">if(i % 2 === 0)</span></li>
                <li>Использовать шаг 2: <span class="highlight">for(let i = 2; i <= 100; i += 2)</span></li>
            </ul>
            
            <h3>Оператор остатка от деления:</h3>
            <p><span class="highlight">%</span> - возвращает остаток от деления</p>
            <p>Число четное, если остаток от деления на 2 равен 0: <span class="highlight">число % 2 === 0</span></p>
            <p>Число нечетное, если остаток от деления на 2 равен 1: <span class="highlight">число % 2 === 1</span></p>
        `,
  },
};

// Переменные для игры "Угадай число"
let secretNumber = null;
let attemptsLeft = 3;
let attemptsHistory = [];

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", function () {
  // Настройка вкладок
  setupTabs();

  // Начальная загрузка теории
  loadTheory("conditions");

  // Настройка обработчиков событий
  setupEventListeners();

  // Инициализация игры
  initGame();
});

// Настройка переключения вкладок
function setupTabs() {
  const tabs = document.querySelectorAll(".nav-tab");
  const tabContents = document.querySelectorAll(".tab-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");

      // Обновляем активную вкладку
      tabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      // Показываем соответствующий контент
      tabContents.forEach((content) => {
        content.classList.remove("active");
        if (content.id === tabId) {
          content.classList.add("active");
        }
      });

      // Загружаем теорию для активной вкладки
      loadTheory(tabId);
    });
  });
}

// Загрузка теории для выбранной вкладки
function loadTheory(tabId) {
  const theoryElement = document.getElementById("theory-content");
  const hintElement = document.getElementById("current-hint");

  if (theoryData[tabId]) {
    theoryElement.innerHTML = `
            <h3>${theoryData[tabId].title}</h3>
            ${theoryData[tabId].content}
        `;

    // Обновляем подсказку
    hintElement.textContent = getHintForTab(tabId);
  }
}

// Получение подсказки для вкладки
function getHintForTab(tabId) {
  const hints = {
    conditions:
      "Используйте if/else для разветвления логики программы. Не забывайте про фигурные скобки {} для блоков кода.",
    calculator:
      "Используйте switch/case для обработки разных операций. Не забудьте обработать деление на ноль!",
    cycles:
      "Циклы for используются, когда известно количество итераций. Циклы while - когда условие может меняться во время выполнения.",
    guessGame:
      "Используйте Math.floor(Math.random() * 10) + 1 для генерации числа от 1 до 10. Учтите, что Math.random() дает число от 0 до 1.",
    numbers:
      "Для проверки четности используйте оператор % (остаток от деления). Четное число делится на 2 без остатка.",
  };

  return hints[tabId] || "Выберите раздел для получения подсказок.";
}

// Настройка обработчиков событий
function setupEventListeners() {
  // Проверка числа
  document
    .getElementById("check-number")
    .addEventListener("click", checkNumber);

  // Калькулятор
  document
    .getElementById("calculate")
    .addEventListener("click", performCalculation);

  // Игра "Угадай число"
  document.getElementById("guess-btn").addEventListener("click", checkGuess);
  document.getElementById("start-game").addEventListener("click", initGame);

  // Числовые задания
  document
    .getElementById("print-numbers")
    .addEventListener("click", printNumbers);
  document
    .getElementById("print-even")
    .addEventListener("click", printEvenNumbers);
}

// Проверка числа (if/else)
function checkNumber() {
  const input = document.getElementById("number-input");
  const result = document.getElementById("number-result");
  const num = parseInt(input.value);

  if (isNaN(num)) {
    result.textContent = "Пожалуйста, введите число!";
    return;
  }

  let message;

  if (num < 0) {
    message = `Число ${num} отрицательное`;
  } else if (num === 0) {
    message = "Это ноль";
  } else if (num > 0 && num < 10) {
    message = `Число ${num} положительное и меньше 10`;
  } else if (num >= 10 && num < 100) {
    message = `Число ${num} положительное и двузначное`;
  } else {
    message = `Число ${num} положительное и большое`;
  }

  // Добавляем проверку на четность
  if (num !== 0) {
    message += num % 2 === 0 ? ", четное" : ", нечетное";
  }

  result.textContent = message;
}

// Выполнение расчета (калькулятор)
function performCalculation() {
  const num1 = parseFloat(document.getElementById("num1").value);
  const num2 = parseFloat(document.getElementById("num2").value);
  const operation = document.getElementById("operation").value;
  const result = document.getElementById("calc-result");

  if (isNaN(num1) || isNaN(num2)) {
    result.textContent = "Пожалуйста, введите оба числа!";
    return;
  }

  let calcResult;

  switch (operation) {
    case "+":
      calcResult = num1 + num2;
      break;
    case "-":
      calcResult = num1 - num2;
      break;
    case "*":
      calcResult = num1 * num2;
      break;
    case "/":
      if (num2 === 0) {
        calcResult = "Ошибка: деление на ноль";
      } else {
        calcResult = num1 / num2;
      }
      break;
    default:
      calcResult = "Неизвестная операция";
  }

  result.textContent = `${num1} ${operation} ${num2} = ${calcResult}`;
}

// Инициализация игры "Угадай число"
function initGame() {
  secretNumber = Math.floor(Math.random() * 10) + 1;
  attemptsLeft = 3;
  attemptsHistory = [];

  document.getElementById("attempts-left").textContent = attemptsLeft;
  document.getElementById("secret-number").textContent = "?";
  document.getElementById("attempts-history").textContent = "-";
  document.getElementById("game-result").textContent =
    "Игра началась! Угадайте число от 1 до 10. У вас 3 попытки.";
  document.getElementById("guess-input").value = "";
}

// Проверка числа в игре
function checkGuess() {
  if (secretNumber === null) {
    initGame();
  }

  const guessInput = document.getElementById("guess-input");
  const guess = parseInt(guessInput.value);
  const gameResult = document.getElementById("game-result");
  const attemptsElement = document.getElementById("attempts-left");
  const secretElement = document.getElementById("secret-number");
  const historyElement = document.getElementById("attempts-history");

  if (isNaN(guess) || guess < 1 || guess > 10) {
    gameResult.textContent = "Пожалуйста, введите число от 1 до 10!";
    return;
  }

  // Добавляем попытку в историю
  attemptsHistory.push(guess);
  historyElement.textContent = attemptsHistory.join(", ");

  // Уменьшаем количество попыток
  attemptsLeft--;
  attemptsElement.textContent = attemptsLeft;

  // Проверяем число
  if (guess === secretNumber) {
    gameResult.textContent = `Поздравляем! Вы угадали число ${secretNumber}!`;
    secretElement.textContent = secretNumber;
    secretNumber = null; // Сбрасываем игру
  } else if (attemptsLeft === 0) {
    gameResult.textContent = `Игра окончена! Загаданное число было: ${secretNumber}`;
    secretElement.textContent = secretNumber;
    secretNumber = null; // Сбрасываем игру
  } else if (guess < secretNumber) {
    gameResult.textContent = `Слишком маленькое число. Осталось попыток: ${attemptsLeft}`;
  } else {
    gameResult.textContent = `Слишком большое число. Осталось попыток: ${attemptsLeft}`;
  }

  guessInput.value = "";
  guessInput.focus();
}

// Вывод чисел от 1 до 100
function printNumbers() {
  const output = document.getElementById("numbers-output");
  let numbers = "";

  for (let i = 1; i <= 100; i++) {
    numbers += i + " ";

    // Добавляем перенос строки каждые 10 чисел для удобства чтения
    if (i % 10 === 0) {
      numbers += "\n";
    }
  }

  output.textContent = numbers;
}

// Вывод четных чисел от 1 до 100
function printEvenNumbers() {
  const output = document.getElementById("even-output");
  let evenNumbers = "";
  let count = 0;

  // Первый способ: с использованием условия if
  for (let i = 1; i <= 100; i++) {
    if (i % 2 === 0) {
      evenNumbers += i + " ";
      count++;

      // Добавляем перенос строки каждые 10 чисел
      if (count % 10 === 0) {
        evenNumbers += "\n";
      }
    }
  }

  // Второй способ (закомментирован):
  /*
    for (let i = 2; i <= 100; i += 2) {
        evenNumbers += i + " ";
        count++;
        
        if (count % 10 === 0) {
            evenNumbers += "\n";
        }
    }
    */

  output.textContent = evenNumbers;
}

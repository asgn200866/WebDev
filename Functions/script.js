let a = +prompt("Введите число A");
let b = +prompt("Введите число B");

function summa(a, b) {
  let sum = +(a + b);
  console.log(`Сумма чисел равна ` + sum);
  return sum;
}

function parityA(a) {
  if (a % 2 == 1) {
    console.log(`Число ${a} нечетное`);
  } else {
    console.log(`Число ${a} четное`);
  }
}

function parityB(b) {
  if (b % 2 == 1) {
    console.log(`Число ${b} нечетное`);
  } else {
    console.log(`Число ${b} четное`);
  }
}

function paritySum(result) {
  if (result % 2 == 1) {
    console.log(`Число ${result} нечетное`);
  } else {
    console.log(`Число ${result} четное`);
  }
}

function randomNum(a, b) {
  let min, max;
  if (a > b) {
    min = b;
    max = a;
    resRan = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(`Рандомное число от ${min} до ${max} равняется ${resRan}`);
  } else if (b > a) {
    min = a;
    max = b;
    resRan = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(`Рандомное число от ${min} до ${max} равняется ${resRan}`);
  } else {
    console.log(`Числа ${a} и ${b} равны`);
  }
  return Math.floor(Math.random() * (a - b + 1)) + a;
}

var result = summa(a, b);
parityA(a);
parityB(b);
paritySum(result);
randomNum(a, b);

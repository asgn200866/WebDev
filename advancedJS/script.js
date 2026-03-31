function myPromise() {
  return new Promise((resolve, reject) => {
    const success = true;

    if (success) {
      resolve("Данные успешно получены");
    } else {
      reject("Произошла ошибка");
    }
  });
}

myPromise()
  .then((result) => {
    setTimeout(() => {
      console.log("Успех:", result);
      return result;
    }, 5000);
  })
  .catch((error) => {
    console.error("Ошибка:", error);
  })
  .finally(() => {
    setTimeout(() => {
      console.log("Операция завершена");
    }, 6000);
  });

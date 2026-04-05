const fetchElement = document.querySelector(".fetch-log");

fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((data) => {
    console.table(data);
    data.forEach((element) => {
      const framentMain = document.createElement("p");
      framentMain.textContent = element.title;

      fetchElement.after(`${element.title}`, framentMain);
      console.log(element.title);
    });
  })
  .catch((error) => console.error(error));

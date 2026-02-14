const labelTextTasks = document.querySelectorAll(".label-text-tasks");

labelTextTasks.forEach((string, index) => {
  console.log(`string ${index}`, string.labelTextTasks);

  const input = string.querySelector(".tasks-input");
});

let labelTextConstruction = labelTextTasks.innerHTML;
console.log(labelTextConstruction);

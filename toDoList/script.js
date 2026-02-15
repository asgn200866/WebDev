const labelTextTasks = document.querySelectorAll(".label-text-tasks");

labelTextTasks.forEach((string, index) => {
  console.log(`string ${index}`, string.outerHTML);
});

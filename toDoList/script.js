const labelTextTasks = document.getElementsByClassName("label-text-tasks");
const elColumnTasks = document.getElementById("tasksText");

let fragmentTasksMain = document.createElement("div");
fragmentTasksMain.className = "label-text-tasks";
fragmentTasksMain.innerHTML = `<input type="checkbox" class="tasks-cb"><input type="text" class="tasks-input">`;
elColumnTasks.insertAdjacentElement("beforeend", fragmentTasksMain);

function TaskArr(text, index) {
  this.text = text;
  this.index = index;
}

Array.from(labelTextTasks).forEach((string, index) => {
  console.log(`string ${index}`);
  let fragmentTasksTest = string.outerHTML;
  console.log(fragmentTasksTest);
});

/**inputArea.addEventListener("input", textTracker); */

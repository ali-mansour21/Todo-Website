let taskTitle = document.getElementById("title");
let taskDescription = document.getElementById("description");
const tasksContainer = document.getElementById("tasksContainer");
const addButton = document.getElementById("addTask");
let tasksArray = [];
let taskId = 0;
let deleteButtons = [];
function addToLocalStorage() {
  localStorage.setItem("userTasks", JSON.stringify(tasksArray));
}
function getTasksFromLocalStorage() {
  const tasks = localStorage.getItem("userTasks");
  if (tasks) {
    tasksArray = JSON.parse(tasks);
  }
}
function showNoTasks(tasks) {
  if (tasks.length === 0) {
    tasksContainer.innerHTML =
      "<h2 class='notasks-message'>Good Job! Go have some sleep</h2>";
  }
}
function generateTasks(task) {
  return `<div class="catchTask">
                                    <div class="header"><input type="checkbox" />
                                    <h2>${task.title}</h2></div>
                                    <div class="delete-item">
                                        <p>${task.description}</p>
                                        <button class="delete-button delete-now" data-task-id="${task.id}">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                class="w-6 h-6"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>`;
}
function taskLoader() {
  tasksContainer.innerHTML = "";
  if (tasksArray.length > 0) {
    for (let i = 0; i < tasksArray.length; i++) {
      const taskElement = tasksArray[i];
      const taskCard = generateTasks(taskElement);
      tasksContainer.innerHTML += taskCard;
    }
  } else {
    showNoTasks(tasksArray);
  }
  addToLocalStorage();
}
getTasksFromLocalStorage();
showNoTasks(tasksArray);
addButton.addEventListener("click", function () {
  if (taskDescription.value === "" || taskTitle.value === "") {
    alert("Title and Description cann't be empty");
  } else {
    const addedTask = {
      id: taskId,
      title: taskTitle.value,
      description: taskDescription.value,
    };
    taskId += 1;
    tasksArray.push(addedTask);
    taskTitle.value = "";
    taskDescription.value = "";
    taskLoader();
  }
});
tasksContainer.addEventListener("click", function (event) {
  const deleteButton = event.target.closest(".delete-now");
  if (deleteButton) {
    const taskId = deleteButton.dataset.taskId;
    tasksArray = tasksArray.filter((task) => task.id !== parseInt(taskId));
    addToLocalStorage();
    taskLoader();
    showNoTasks(tasksArray);
  }
});
window.addEventListener("load", function () {
  taskLoader();
});

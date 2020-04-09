//Define UI variables
const taskInput = document.querySelector("#task");
const form = document.querySelector("#task-form");
const list = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");

loadEventListener();

function loadEventListener() {
  document.addEventListener("DOMContentLoaded", showTasks);
  form.addEventListener("submit", Addtask);
  list.addEventListener("click", deleteTask);
  filter.addEventListener("keyup", filterTask);
  clearBtn.addEventListener("click", clearList);
}

function showTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks !== null) {
    tasks.forEach(function (task) {
      const li = document.createElement("li");
      li.className = "collection-item";
      li.innerText = task;

      const link = document.createElement("a");
      link.className = "delete-item secondary-content";
      link.innerHTML = '<i class="fa fa-remove"></i>';
      li.appendChild(link);
      list.appendChild(li);
      //storeTask(taskInput);
      //localStorage.setItem(taskInput.value);
      // taskInput.value = "";
    });
  }
}

function Addtask(e) {
  if (taskInput.value === "") {
    alert("please,add a task");
  } else {
    const li = document.createElement("li");
    li.className = "collection-item";
    li.innerText = taskInput.value;

    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    list.appendChild(li);
    storeTask(taskInput);
    //localStorage.setItem(taskInput.value);
    taskInput.value = "";
  }
  e.preventDefault();
}

function storeTask(task) {
  const val = task.value;
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
    //localStorage.setItem("tasks", val);
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(val);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(e) {
  if (e.target.classList.contains("fa")) {
    if (confirm("are you sure?")) {
      e.target.parentElement.parentElement.remove();
      const rm = e.target.parentElement.parentElement;
      deleteFromstorage(rm);
    }
  }
}

function deleteFromstorage(item) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks !== null) {
    tasks.forEach(function (task, index) {
      if (item.textContent === task) {
        tasks.splice(index, 1);
      }
    });
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function clearList() {
  list.innerHTML = "";
  localStorage.clear();
}

function filterTask() {
  const input = filter.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.textContent.toLowerCase();
    if (item.indexOf(input) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

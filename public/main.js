const taskInputField = document.getElementById("task-input");
const addTaskBtn = document.querySelector(".add-task");
const taskList = document.querySelector(".task-list");
const finishedTaskList = document.querySelector(".finished-tasks");
const taskListItem = document.querySelectorAll(".list-item");
const clearTasksBtn = document.querySelector(".clear-tasks");
const filterInput = document.getElementById("filter");
const checkbox = document.getElementById("checkbox");
const filterTasks = document.getElementById("filter-tasks");
const changeColorMode = document.getElementById("background-mode");

function addNewTask(task) {
    let newTaskListItem = document.createElement("li");
    newTaskListItem.className = "list-item list border-rose-100 text-rose-100 incomplete";
    newTaskListItem.innerText = task;

    let deleteTaskBtn = document.createElement("a");
    deleteTaskBtn.setAttribute("href", "#");
    deleteTaskBtn.classList.add("btn-delete");
    newTaskListItem.appendChild(deleteTaskBtn);

    let taskCheck = document.createElement("input");
    taskCheck.setAttribute("type", "checkbox");
    taskCheck.className = "checkbox float-right mr-2 ";
    taskCheck.id = "checkbox";
    newTaskListItem.appendChild(taskCheck);

    taskList.appendChild(newTaskListItem);
    return newTaskListItem;
}

function addTaskFromInput() {
    addNewTask(taskInputField.value);
}

//fetching api url
function fetchAPIData() {
    fetch('http://localhost:8886/todo_list/api/todo_item/read.php')
        .then(response => response.json())
        .then(data => {
            let dataArray = data.data;
            dataArray.forEach(todoItem => {
                let todoListItem = addNewTask(todoItem.name);

                if (todoItem.completed) {
                    console.log(todoListItem)
                    finishTask(
                        todoListItem.getElementsByClassName('checkbox')[0]
                    );
                }
            })
        });
}
fetchAPIData();

function allEventListeners() {
    addTaskBtn.addEventListener("click", addTaskFromInput)
    taskList.addEventListener("click", removeOneTask);
    finishedTaskList.addEventListener("click", removeOneTask);
    taskList.addEventListener("click", markInputTaskFinished);
    finishedTaskList.addEventListener("click", unmarkTaskFinished);
    filterTasks.addEventListener("change", filterTasksFunction);
    changeColorMode.addEventListener("change", onThemeChange);
}
allEventListeners();

function removeOneTask(e) {
    if (e.target.classList.contains("btn-delete")) {
        e.target.parentElement.remove();
    };
}

function finishTask(e) {
    e.parentElement.style.textDecoration = "line-through";
    e.parentElement.className = "list-item list text-blue-100 border-blue-100 complete";
    finishedTaskList.appendChild(e.parentElement);
}

function markInputTaskFinished(e) {
    if (e.target.classList.contains("checkbox") && e.target.checked) {
        finishTask(e.target);
    };
}

function unmarkTaskFinished(e) {
    if (e.target.classList.contains("checkbox")) {
        e.target.parentElement.style.textDecoration = "none";
        e.target.parentElement.className = "list-item list border-rose-100 text-rose-100 incomplete";
        taskList.appendChild(e.target.parentElement);
    };
}

function removeAllTasks() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
}

function filterTasksFunction(e) {
    const tasks = document.getElementById("all-tasks").getElementsByTagName("li");

    for (task of tasks) {
        switch (e.target.value) {
            case "all":
                task.style.display = "block";
                break;
            case "complete":
                if (task.classList.contains("complete")) {
                    task.style.display = "block";
                } else {
                    task.style.display = "none";
                }
                break;
            case "not-complete":
                if (task.classList.contains("incomplete")) {
                    task.style.display = "block";
                } else {
                    task.style.display = "none";
                }
                break;
        }
    }

}

//toggling dark mode && adding it to cookies
const themes = [{ name: "light", className: "light-mode" }, { name: "dark", className: "dark-mode" }];

function changeTheme(themeName) {
    const documentBody = document.querySelector("body");
    for (const theme of themes) {
        if (themeName == theme.name) {
            documentBody.classList.add(theme.className);
            changeColorMode.value = theme.name;
        } else {
            documentBody.classList.remove(theme.className);
        }
    }
}

function onThemeChange(e) {
    changeTheme(e.target.value);
    document.cookie = "theme=" + e.target.value;
}

let cookieValue = document.cookie
    .split('; ')
    .find(function (cookie) { return cookie.startsWith("theme") })
    .split('=')[1];

changeTheme(cookieValue);


//saving all tasks to session storage
document.querySelector("form").addEventListener("submit", function (e) {
    const task = taskInputField.value;
    let tasks;
    if (sessionStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(sessionStorage.getItem("tasks"));
    }
    tasks.push(task);
    sessionStorage.setItem("tasks", JSON.stringify(tasks));
    taskInputField.value = "";

    e.preventDefault();
})




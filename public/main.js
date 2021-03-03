const taskInputField = document.getElementById("task-input");
const addTaskBtn = document.querySelector(".add-task");
const taskList = document.querySelector(".task-list");
const finishedTaskList = document.querySelector(".finished-tasks");
const taskListItem = document.querySelectorAll(".list-item");
const clearTasksBtn = document.querySelector(".clear-tasks");
const taskFilter = document.getElementById("filter-tasks");
const changeColorMode = document.getElementById("background-mode");

function allEventListeners() {
    taskList.addEventListener("click", removeOneTask);
    finishedTaskList.addEventListener("click", removeOneTask);
    taskList.addEventListener("click", markInputTaskFinished);
    finishedTaskList.addEventListener("click", unmarkTaskFinished);
    taskFilter.addEventListener("change", filterTasks);
    changeColorMode.addEventListener("change", onThemeChange);
    document.querySelector("form").addEventListener("submit", addTaskToDB);
}
allEventListeners();

function addNewTask(task, cleanInputField = false) {
    let newTaskListItem = document.createElement("li");
    newTaskListItem.className = "list-item list border-rose-100 text-rose-100 incomplete";
    newTaskListItem.innerText = task.name;

    let deleteTaskBtn = document.createElement("a");
    deleteTaskBtn.setAttribute("href", "#");
    deleteTaskBtn.setAttribute("data-id", `${task.id}`);
    deleteTaskBtn.classList.add("btn-delete");
    newTaskListItem.appendChild(deleteTaskBtn);

    let taskCheck = document.createElement("input");
    taskCheck.setAttribute("type", "checkbox");
    taskCheck.className = "checkbox float-right mr-2 ";
    taskCheck.id = "checkbox";
    newTaskListItem.appendChild(taskCheck);

    taskList.appendChild(newTaskListItem);

    if (cleanInputField) {
        taskInputField.value = " ";
    }

    return newTaskListItem;
}

function addTaskFromInput() {
    addNewTask({ name: taskInputField.value });
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

function removeOneTask(e) {
    let id = e.target.getAttribute('data-id');

    if (e.target.classList.contains("btn-delete")) {
        e.target.parentElement.remove();
        deleteTaskFromDB(id);
    };
}

function removeAllTasks() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
}

function filterTasks(e) {
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
    .split("; ")
    .find(function (cookie) { return cookie.startsWith("theme") })
    .split("=")[1];

changeTheme(cookieValue);


//saving all tasks to session storage
function saveToSessionStorage(e) {
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
}

//API actions
function fetchAPIData() {
    fetch("http://localhost:8886/todo_list/api/todo_item/read.php")
        .then(response => response.json())
        .then(data => {
            let dataArray = data.data;
            dataArray.forEach(todoItem => {
                let todoListItem = addNewTask(todoItem);
                if (todoItem.completed) {
                    finishTask(todoListItem.getElementsByClassName("checkbox")[0]);
                }
            })
        });

}
fetchAPIData();

function addTaskToDB(e) {
    e.preventDefault();

    let title = taskInputField.value;
    const completed = "0";

    fetch("http://localhost:8886/todo_list/api/todo_item/create.php", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify({ name: title, completed: completed })
    })
        .then(response => response.json())
        .then(data => addNewTask(data, true))
        .catch(error => { throw (error) })
}



function deleteTaskFromDB(id) {
    return fetch("http://localhost:8886/todo_list/api/todo_item/delete.php", {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ id: id })
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => reject(err));

}





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

//create new li element
function addNewTask() {
    //get taskInputField value and clear the input field after that
    let task = taskInputField.value;


    //create a new li element with the input from taskInputField
    let newTaskListItem = document.createElement("li");
    newTaskListItem.className = "list-item list border-rose-100 text-rose-100 incomplete";
    newTaskListItem.innerText = task;

    //create a delete btn for each task list item
    let deleteTaskBtn = document.createElement("a");
    deleteTaskBtn.setAttribute("href", "#");
    deleteTaskBtn.classList.add("btn-delete");
    newTaskListItem.appendChild(deleteTaskBtn);

    //create a checkbox for each task list item
    let taskCheck = document.createElement("input");
    taskCheck.setAttribute("type", "checkbox");
    taskCheck.className = "checkbox float-right mr-2 ";
    taskCheck.id = "checkbox";
    newTaskListItem.appendChild(taskCheck);

    //append new task list item (with checkbox and delete btn) to task list ul
    taskList.appendChild(newTaskListItem);
}

function allEventListeners() {
    //remove a task
    taskList.addEventListener("click", removeOneTask);
    finishedTaskList.addEventListener("click", removeOneTask);
    //marking task as done
    taskList.addEventListener("click", markTaskFinished);
    //unmarking task as undone
    finishedTaskList.addEventListener("click", unmarkTaskUnfinished)
    //task input works on enter
    // taskInputField.addEventListener("keyup", function (e) {
    //     if (e.keyCode === 13) {
    //         e.preventDefault();
    //         addTaskBtn.click();
    //     }
    // });

    //filtering tasks
    filterTasks.addEventListener("change", filterTasksFunction);
    //changing color mode
    changeColorMode.addEventListener("change", onThemeChange);

}
allEventListeners();

//remove one specific task
function removeOneTask(e) {
    if (e.target.classList.contains("btn-delete")) {
        e.target.parentElement.remove();
    };
}

//mark a finished task & move to the bottom
function markTaskFinished(e) {
    if (e.target.classList.contains("checkbox") && e.target.checked) {
        e.target.parentElement.style.textDecoration = "line-through";
        e.target.parentElement.className = "list-item list text-blue-100 border-blue-100 complete";
        finishedTaskList.appendChild(e.target.parentElement);
    };
}

//unmark a finished task and move back to the top
function unmarkTaskUnfinished(e) {
    if (e.target.classList.contains("checkbox")) {
        e.target.parentElement.style.textDecoration = "none";
        e.target.parentElement.className = "list-item list border-rose-100 text-rose-100 incomplete";
        taskList.appendChild(e.target.parentElement);
    };
}

//remove all tasks at once
function removeAllTasks() {
    taskList.innerHTML = "";
    finishedTaskList.innerHTML = "";

    //faster way of removing all li elements
    // while (taskList.firstChild) {
    //     taskList.removeChild(taskList.firstChild);
    // }
}

//filtering complete/incomplete tasks
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
    //get body tag to toggle its classes
    const documentBody = document.querySelector("body");
    for (const theme of themes) {
        //if the element clicked has the same value as the theme from const themes, add classname that corresponds to that name
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
    .find(function (cookie) { return cookie.startsWith("theme") }) //cookie => cookie.startsWith("theme")
    .split('=')[1];

changeTheme(cookieValue);


//saving all tasks to session storage
document.querySelector("form").addEventListener("submit", function (e) {
    //getting the value from input field
    const task = taskInputField.value;
    //this is where all the tasks are going to be saved
    let tasks;
    //checking if the session storage has a value already
    if (sessionStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(sessionStorage.getItem("tasks"));
    }
    //adding tasks to the array
    tasks.push(task);
    //adding tasks to teh session storage
    sessionStorage.setItem("tasks", JSON.stringify(tasks));
    //clear the input fiel
    taskInputField.value = "";
    //prevent default 
    e.preventDefault();
})


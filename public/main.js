const taskInputField = document.getElementById("task-input");
const addTaskBtn = document.querySelector(".add-task");
const taskList = document.querySelector(".task-list");
const finishedTaskList = document.querySelector(".finished-tasks");
const taskListItem = document.querySelectorAll(".list-item");
const clearTasksBtn = document.querySelector(".clear-tasks");
const filterInput = document.getElementById("filter");
const checkbox = document.getElementById("checkbox");
const filterTasks = document.querySelector(".filter-tasks");

//create new li element
function addNewTask() {
    //get taskInputField value and clear the input field after that
    let task = taskInputField.value;
    taskInputField.value = "";

    //create a new li element with the input from taskInputField
    let newTaskListItem = document.createElement("li");
    newTaskListItem.className = "list-item border-2 border-rose-100 bg-rose-200 my-2 h-10 p-2 incomplete";
    newTaskListItem.innerText = task;

    //create a delete btn for each task list item
    let deleteTaskBtn = document.createElement("a");
    deleteTaskBtn.setAttribute("href", "#");
    deleteTaskBtn.classList.add("btn-delete");
    newTaskListItem.appendChild(deleteTaskBtn);

    //create a checkbox for each task list item
    let taskCheck = document.createElement("input");
    taskCheck.setAttribute("type", "checkbox");
    taskCheck.className = "checkbox float-right mr-1.5 ";
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
    taskInputField.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            addTaskBtn.click();
        }
    });
    //filtering tasks
    filterTasks.addEventListener("click", filterTasksFunction);

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
        e.target.parentElement.className = "border-2 border-green-100 bg-green-200 my-2 h-10 p-2 complete";
        finishedTaskList.appendChild(e.target.parentElement);
    };
}

//unmark a finished task and move back to the top
function unmarkTaskUnfinished(e) {
    if (e.target.classList.contains("checkbox")) {
        e.target.parentElement.style.textDecoration = "none";
        e.target.parentElement.className = "border-2 border-rose-100 bg-rose-200 my-2 h-10 p-2 incomplete";
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

//filtering the tasks according to complete/incomplete
function filterTasksFunction(e) {
    const tasks = document.getElementById("all-tasks").getElementsByTagName("li");

    // document.getElementById("all-tasks").childNodes;
    console.log(tasks);



    for (let i = 0; i < tasks.length; i++) {
        console.log(e.target.value);

        switch (e.target.value) {
            case "all":
                tasks[i].style.display = "block";
                break;
            case "complete":
                if (tasks[i].classList.contains("complete")) {
                    tasks[i].style.display = "block";
                } else {
                    tasks[i].style.display = "none";
                }
                break;
            case "incomplete":
                if (!tasks[i].classList.contains("incomplete")) {
                    tasks[i].style.display = "block";
                } else {
                    tasks[i].style.display = "none";
                }
                break;
        }
    }
}

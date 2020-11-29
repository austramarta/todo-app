const taskInputField = document.getElementById("task-input");
const addTaskBtn = document.querySelector(".add-task");
const taskList = document.querySelector(".task-list");
const taskListItem = document.querySelectorAll(".list-item");
const clearTasksBtn = document.querySelector(".clear-tasks");
const filterInput = document.getElementById("filter");

//create new li element
function addNewTask() {
    //get taskInputField value and clear the input field after that
    let task = taskInputField.value;
    taskInputField.value = "";

    //create a new li element with the input from taskInputField

    let newTaskListItem = document.createElement("li");
    newTaskListItem.className = "list-item";
    newTaskListItem.innerText = task;

    //create a delete btn for each task list item
    let deleteTaskBtn = document.createElement("a");
    deleteTaskBtn.setAttribute("href", "#");
    deleteTaskBtn.classList.add("btn-delete");
    newTaskListItem.appendChild(deleteTaskBtn);

    //append new task list item to task list ul
    taskList.appendChild(newTaskListItem);
}


//remove all tasks at once
function removeAllTasks() {
    // taskList.innerHTML = "";

    //faster way of removing all li elements
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
}

//remove one specific task
taskList.addEventListener("click", removeOneTask)
function removeOneTask(e) {
    if (e.target.classList.contains("btn-delete")) {
        // console.log(e.target.parentElement);
        e.target.parentElement.remove();
    };
}


filterInput.addEventListener("keyup", filterTasks);
function filterTasks(e) {
    filterInputText = e.target.value;
    console.log(filterInputText);

}


taskInputField.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addTaskBtn.click();
    }
});
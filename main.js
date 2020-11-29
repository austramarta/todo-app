const taskInputField = document.getElementById("task-input");
const addTaskBtn = document.querySelector(".add-task");
const taskList = document.querySelector(".task-list");
const taskListItem = document.querySelectorAll(".list-item");
const clearTasksBtn = document.querySelector(".clear-tasks");
const filterInput = document.getElementById("filter");
const checkbox = document.getElementById("checkbox");

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

    //create a checkbox for each task list item
    let taskCheck = document.createElement("input");
    taskCheck.setAttribute("type", "checkbox");
    taskCheck.classList.add("checkbox");
    taskCheck.id = "checkbox";
    newTaskListItem.appendChild(taskCheck);

    //append new task list item (with checkbox and delete btn) to task list ul
    taskList.appendChild(newTaskListItem);
    console.log(taskList);

}



//remove one specific task
taskList.addEventListener("click", removeOneTask);
function removeOneTask(e) {
    if (e.target.classList.contains("btn-delete")) {
        // console.log(e.target.parentElement);
        e.target.parentElement.remove();
    };
}

//check that a task is finished
taskList.addEventListener("click", markTaskAsDone);
function markTaskAsDone(e) {
    if (e.target.classList.contains("checkbox") && e.target.checked) {
        e.target.parentElement.style.textDecoration = "line-through";
    } else {
        e.target.parentElement.style.textDecoration = "none";
    };
}



//remove all tasks at once
function removeAllTasks() {
    // taskList.innerHTML = "";

    //faster way of removing all li elements
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
}

//filter tasks
filterInput.addEventListener("keyup", filterTasks);
function filterTasks(e) {
    filterInputText = e.target.value;

    taskListItem


}





taskInputField.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addTaskBtn.click();
    }
});
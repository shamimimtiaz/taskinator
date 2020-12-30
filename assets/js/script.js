var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");

console.log(buttonEl);

var createTaskHandler = function() {
    var taskItemEl = document.createElement("li");
    taskItemEl.textContent = "This is a new task";
    tasksToDoEl.appendChild(taskItemEl);
    taskItemEl.className="task-item";
}

buttonEl.addEventListener ("click",  createTaskHandler);


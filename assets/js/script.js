var taskIdCounter = 0;
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var pageContentEl = document.querySelector("#page-content");


var taskFormHandler = function (event) {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;  //we use square brackets [ ] in a selector, we're trying to select an HTML element(input) by one of its (name) attributes set to a value of "task-name"
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

  // check if input values are empty strings
  //When we use the syntax !taskNameInput, we're checking to see if the taskNameInput variable is empty by asking if it's a falsy value.
  if (!taskNameInput || !taskTypeInput) {
    alert("You need to feel out the Task Form!");
    return false;
  }
  
  // reset form fields for next task to be entered
  document.querySelector("input[name='task-name']").value = "";
  document.querySelector("select[name='task-type']").selectedIndex = 0;
  
  // check if task is new or one being edited by seeing if it has a data-task-id attribute
  var isEdit = formEl.hasAttribute("data-task-id");
  //console.log(isEdit);
  if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  }
  
  else {
  //// no data attribute, so create object as normal and pass to createTaskEl function  
  // package up data as an object
  var taskDataObj = {
    name : taskNameInput,
    type : taskTypeInput
  }; 
  //for reset the form
  formEl.reset();
  // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
  }
};

var createTaskEl = function (taskDataObj) {

// create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
// add task id as a custom attribute (The setAttribute() method can be used to add or update any attribute on an HTML element)
    listItemEl.setAttribute("data-task-id", taskIdCounter);    
    listItemEl.setAttribute("draggable", "true");
// create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
// add HTML content to div (Used a new DOM element property, innerHTML, to write HTML code instead of simple text.)
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    // create task actions (buttons and select) for task
    var taskActionsEl = createTaskActions(taskIdCounter);     
    listItemEl.appendChild(taskActionsEl);
// add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

//counter by one (i.e., by using taskIdCounter++) to keep each id unique
    taskIdCounter++;    
};

var createTaskActions = function (taskId) {
// create container to hold elements
  var actionsContainerEl = document.createElement ("div");
    actionsContainerEl.className = "task-actions";

// create edit button
  var editButtonEl = document.createElement ("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionsContainerEl.appendChild(editButtonEl);

// create delete button
  var deleteButtonEl = document.createElement ("delete");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionsContainerEl.appendChild(deleteButtonEl); 

// create select dropdown /create change status dropdown
var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionsContainerEl.appendChild(statusSelectEl);
//create status option
var statusChoices = ["To Do", "In Progress", "Completed"];

for (var i = 0; i < statusChoices.length; i++) {
// create option element
var statusOptionEl = document.createElement("option");
  statusOptionEl.textContent = statusChoices[i];
  statusOptionEl.setAttribute("value", statusChoices[i]);
// append to select
  statusSelectEl.appendChild(statusOptionEl);
}

return actionsContainerEl;
};

var completeEditTask = function (taskName, taskType, taskId) {
// find task list item with taskId value
var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

//set new value
taskSelected.querySelector("h3.task-name").textContent = taskName;
taskSelected.querySelector("span.task-type").textContent = taskType;

alert("Task Updated!");

// remove data attribute from form
formEl.removeAttribute("data-task-id");
// update formEl button to go back to saying "Add Task" instead of "Edit Task"
document.querySelector("#save-task").textContent = "Add Task";
};

var taskButtonHandler = function(event) {  
//get target element from event  
  targetEl = event.target;    //event.target reports the element on which the event occurs

  // edit button was clicked
  if (targetEl.matches (".edit-btn")) {
    console.log("edit", targetEl);
// get the element's task id    
var taskId = targetEl.getAttribute("data-task-id");
  editTask(taskId);                 
// delete button was clicked   
  } else if (targetEl.matches(".delete-btn")) {
    console.log("delete", targetEl);
// get the element's task id
var taskId = event.target.getAttribute("data-task-id")
  deleteTask(taskId);   
  }
};

var taskStatusChangeHandler = function(event) {
console.log(event.target);

// get the task item's id /find task list item based on event.target's data-task-id attribute
var taskId=event.target.getAttribute("#data-task-id");

//get the currently selected option's value and convert to lowercase
var statusValue =event.target.value.toLowerCase();

// find the parent task item element based on the id
var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

if (statusValue === "to do") {
  tasksToDoEl.appendChild(taskSelected);
  } else if (statusValue === "in progress") {
  tasksInProgressEl.appendChild(taskSelected);  
  } else if (statusValue === "completed") {
  taskCompletedEl.appendChild(taskSelected);
  }

};

var editTask = function(taskId) {
//console.log("editing task #" + taskId);
// get task list item element
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']"); 
// get content from task name and type
  var taskName = document.querySelector("h3.task-name").textContent;
//console.log(taskName);
  var taskType = document.querySelector("span.task-type").textContent;
//console.log(taskType);

// write values of taskname and taskType to form to be edited
document.querySelector("input[name='task-name']").value = taskName;
document.querySelector("select[name='task-type']").value = taskType;

 // update form's button to reflect editing a task rather than creating a new one
document.querySelector("#save-task").textContent = "Save Task";

// set data attribute to the form with a value of the task's id so it knows which one is being edited
formEl.setAttribute("data-task-id", taskId);

}

var deleteTask = function (taskId) {
  console.log(taskId);
// find task list element with taskId value and remove it
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']"); 
taskSelected.remove();
}
//we use the setData() and getData() methods to store and retrieve data, including our unique task id from the event, to and from the dataTransfer property on the object.
var dragTaskHandler = function(event) {
 var taskId = event.target.getAttribute ("data-task-id");
event.dataTransfer.setData("text/plain", taskId);   //This expression will store the taskId in the dataTransfer property of the event.Notice how the setData() method receives two arguments: the data's value and format

var getId = event.dataTransfer.getData("text/plain"); //To verify that our dataTransfer property stored the data-task-id attribute, we'll use the getData() method. 
//console.log("getId:", getId, typeof getId);
 
//console.log("Task ID:", taskId);
//console.log("event", event);
 
  //console.log("event.target", event.target);
  //console.log("event.type", event.type);
  //console.log("event", event);

}

var dropTaskHandler = function (event) {
  var id = event.dataTransfer.getData("text/plain");
  var draggableElement = document.querySelector("[data-task-id='" + id + "']");
  var dropZoneEl = event.target.closest (".task-list"); //verified that the event.target property of the drop event identified the drop zone. closest() method to return the corresponding task list element of the drop zone
  
  
// set status of task based on dropzone id
var statusSelectEl = draggableElement.querySelector("select[name='status-change']");
var statusType = dropZoneEl.id;

if (statusType === "tasks-to-do") {
  statusSelectEl.selectedIndex = 0;
} 
else if (statusType === "tasks-in-progress") {
  statusSelectEl.selectedIndex = 1;
} 
else if (statusType === "tasks-completed") {
  statusSelectEl.selectedIndex = 2;

  dropZoneEl.appendChild(draggableElement);
}

//console.log(statusSelectEl);
//console.log(statusType);
//  console.log(dropZoneEl);


//console.log = ("draggableElement");  
//console.log("Drop Event Target:", event.target, event.transfer, id);
};

var dropZoneDragHandler = function (event) {
//console.log("Dragover Event Target:", event.target);
var taskListEl = event.target.closest(".task-list"); //The .closest() method searches up through the ancestors of the event.target, which is the drop zone. It looks for an element that matches the selector (.task-list, in this case).

if (taskListEl) {
  event.preventDefault();
  //console.dir(taskListEl);
}

};



//Create a new task
formEl.addEventListener("submit", taskFormHandler);
// for edit and delete buttons
pageContentEl.addEventListener("click", taskButtonHandler);
// for changing the status
pageContentEl.addEventListener("change", taskStatusChangeHandler);

// for draging and dropping
pageContentEl.addEventListener("dragstart", dragTaskHandler);
pageContentEl.addEventListener("dragover", dropZoneDragHandler); //We'll use the dragover event handler to define the drop zone, use the dragover event handler to define the drop zone, which is where the draggable element can be dropped.

pageContentEl.addEventListener("drop", dropTaskHandler); //Just like in the dragover event, the drop event's target property contains the receiving element, or the element that is being dropped upon.
  
  

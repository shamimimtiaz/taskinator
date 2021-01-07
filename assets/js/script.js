    var formEl = document.querySelector("#task-form");
    var tasksToDoEl = document.querySelector("#tasks-to-do");

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
  
  
    // package up data as an object
  var taskDataObj = {
    name : taskNameInput,
    type : taskTypeInput
  };
   
  //for reset the form
  formEl.reset();

  // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
};

var createTaskEl = function (taskDataObj) {

// create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

// create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";

// add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

// add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
};

    formEl.addEventListener("submit", taskFormHandler);





  //listItemEl.textContent = taskNameInput; 
  

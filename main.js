/**
* FILE NAME: main.js
* WRITTEN BY: Alina Zheng
* DATE: 5/1/20
* PURPOSE: CS204 Taskmin
 */

 /**
  * Gathers inputs from form into single description
  * dictionary, adds it to theTaskList as a task using addTask() method
  */
 function addTaskFromForm() {
    var dict = {}; 
    dict.text = $("#taskText").val(); 
    dict.priority = $("[name = taskPriority]").val(); 
    dict.duedate = $("#taskDueDate").val();
    dict.tag = $("[name = tag]:checked").val();
    $(this.li).css('background-color', tagColors[this.tag]);
    theTaskList.addTask(dict); 
 }

 $("#taskDueDate").datepicker(); 

 /**
  * Event handler for "add" button - invokes addTaskFromForm 
  * and closes the form 
  * NOT WORKING
  */
 $("#addTaskButton").on('click', function() {
    addTaskFromForm();
    closeAllDropDowns(); 
 }); 


 /**
  * Delegated event handler formarking a task as "done"
  * Prints to the console the task ID of the task whose "done" button was clicked
  * NOT WORKING?
  */
 //$("#all").on('click', 'button', function (event) {
$("#theTasks").on('click', '.markDone', function(event) {
   var id = $(event.target).closest("li").attr("data-taskId"); 
   console.log(id); 
   var task = theTaskList.findTask(parseInt(id)); 
   task.toggleDone(); 
})

/**
 * Delegated event handler for removing a task
 * 
*/
$("#theTasks").on('click', '.delete', function(event) {
   var id = $(event.target).closest("li").attr("data-taskId"); 
   console.log(id);
   var task = theTaskList.findTask(parseInt(id)); 
   theTaskList.deleteTask(id); 
   task.delete(); 
});

/**
 * Event handler for "load," "save," and "reset" buttons
 */
$("#saveButton").on('click', function() {
   theTaskList.save(); 
});
$("#loadButton").on('click', function() {
   theTaskList.load(); 
}); 
$("#resetButton").on('click', function() {
   theTaskList.addTasks(etd); 
});

/**
 * EVENT HANDLERS FOR SORTING TASKS
 */
$("#sortIdButton").on('click', function(){
   theTaskList.sortById(); 
});
$("#sortTagButton").on('click', function(){
   theTaskList.sortByTag(); 
});
$("#sortDueDateButton").on('click', function(){
   theTaskList.sortByDueDate(); 
});
$("#sortPriorityButton").on('click', function(){
   theTaskList.sortByPriority(); 
});


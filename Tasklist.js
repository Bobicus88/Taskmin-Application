/**
* FILE NAME: Tasklist.js
* WRITTEN BY: Alina Zheng
* DATE: 5/1/20
* PURPOSE: CS204 Taskmin
 */
 class TaskList {
    /**
     * Constructor for objects of class TaskList
     * @param {String} key name of localStorage key to save tasklist under
     */
     constructor(key) {
        this.arr = [];
        this.key = key; 
     }

     /**
      * Pushes task object onto array
      * @param {Task} task the task object to push
      */
     push(task) {
        task.setId(this.arr.length); 
        this.arr.push(task); 
     }

     /**
      * Creates new task object from task description object, 
      * pushes it onto internal array, adds it to the DOM
      * @param description task description object
      */
     addTask(description) {
        var task = new Task(description); 
        this.push(task); 
        task.addToDom(); 
     }

     /**
      * Takes array of task description objects, invokes addTask for each of them
      * @param descriptions array of task description objects
      */
     addTasks(descriptions) {
         for (var i = 0; i < descriptions.length; i++) {
            this.addTask(descriptions[i]); 
         }
     }

     /**
      * Searches array for a task of the given id, returns the task
      * @param id the given id
      * @return the task, or null if the task is not in the array
      */
     findTask(id) {
        var task = null; 
        for (var i = 0; i < this.arr.length; i++) {
            if (this.arr[i].id == id) {
               task = this.arr[i]; 
            }
        }
        return task; 
     }

     /**
      * Finds the index of a task given its id, 
      * deletes task from the array
      */
     deleteTask(id) {
        var task = this.findTask(id); 
        if (task == null) {
         return -1; 
        }
        var index = this.arr.findIndex(function(tsk) {return tsk == task});
        this.arr.splice(index, 1); 
        return task; 
     }

     /**
      * Creates an array of description dictionaries from an array of task objects
      * JSON.stringifies the array
      * Saves it to local storage under the key that was passed to the TaskList constructor
      */
     save() {
         var array = []; 
         for (var i = 0; i < this.arr.length; i++) {
            var dict = {}; 
            dict.text = this.arr[i].text; 
            dict.priority = this.arr[i].priority; 
            dict.duedate = this.arr[i].duedate; 
            dict.tag = this.arr[i].tag; 
            dict.id = this.arr[i].id; 
            dict.done = this.arr[i].done; 
            array.push(dict); 
         }
         var str = JSON.stringify(array); 
         localStorage.setItem(this.key, str);
     }

     /**
      * Reads a string from local storage
      * Parses it into an array using JSON.parse
      * Iterates over the array, adds each task description to the internal list
      * (Since result of load() replaces current tasks, the internal array
      * should be emptied first, and the DOM element showing the tasks should be emptied + replaced)
      */
     load() {
        for (var i = 0; i < this.arr.length; i++) {
           // delete from internal array
           this.deleteTask(i); 
           // remove DOM element from page
           this.arr[i].delete(); 
        }
        var str = localStorage.getItem(this.key); 
        var array = JSON.parse(str); 
        this.addTasks(array); 
     }

     /**
      * Sorts the internal array by the tag
      * Re-displays the task list by emptying the DOM element
      * that displays the tasks and creates new DOM elements for each Task
      */
     sortByTag() {
       // empties the DOM element
      for (var i = 0; i < this.arr.length; i++) {
         this.arr[i].delete(); 
      }
      // sorts the array of Task objects by tag
      // put the personal tasks before the work tasks
      this.arr.sort(function(a,b) {
         return (a.tag).localeCompare(b.tag); 
      }); 
      // creates new DOM elements for each task
      for (var i = 0; i < this.arr.length; i++) {
         var task = new Task(this.arr[i]); 
         this.arr[i].addToDom(); 
      }
     }


     /**
      * Like sortByTag(), except sorts by ID
      */
     sortById() {
      // empties the DOM element
      for (var i = 0; i < this.arr.length; i++) {
         this.arr[i].delete(); 
      }
      // sorts the array of Task objects by ID
         this.arr.sort(function(a, b) {
            return a.id - b.id; 
         }); 
      console.log(this.arr); 
      // creates new DOM elements for each task
      for (var i = 0; i < this.arr.length; i++) {
         var task = new Task(this.arr[i]); 
         this.arr[i].addToDom(); 
      }
     }
   
     /**
      * Like sortByTag(), except sorts Tasks by the due date
      */
     sortByDueDate() {
      // empties the DOM element
      for (var i = 0; i < this.arr.length; i++) {
         this.arr[i].delete(); 
      }
      // sorts the array of Task objects by their due date{
         this.arr.sort(function(a, b) {
            return a.duedate - b.duedate; 
         });
      console.log(this.arr); 
         // creates new DOM elements for each task
         for (var i = 0; i < this.arr.length; i++) {
            var task = new Task(this.arr[i]); 
            this.arr[i].addToDom(); 
         }
     }

     /**
      * Like sortByTag(), except sorts Tasks by the priority
      */
     sortByPriority() {
      // empties the DOM element
      for (var i = 0; i < this.arr.length; i++) {
         this.arr[i].delete(); 
      }
      // sorts the array of Task objects by priority
      this.arr.sort(function(a, b) {
         if (a.priority == b.priority) {
            return 0; 
         } else if ((a.priority == "high") || (a.priority == "medium" && b.priority == "low")) {
            return -1; 
         } else {
            return 1; 
         }
      }); 
      console.log(this.arr); 
      // creates new DOM elements for each task
      for (var i = 0; i < this.arr.length; i++) {
         var task = new Task(this.arr[i]); 
         this.arr[i].addToDom(); 
      }
     }
 }

 // global variable - instance of TaskList
var theTaskList = new TaskList("Alina"); 

/**
* FILE NAME: Task.js
* WRITTEN BY: Alina Zheng
* DATE: 5/1/20
* PURPOSE: CS204 Taskmin
 */

// global variables that hold days of the week, months, tagColors
var days = ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"];
var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
var tagColors = {
    work: 'lightskyblue',
    personal: 'lightgreen'
}; 

/**
* Takes a string as an argument and returns a date object
* Helper for Task constructor 
* @param {string} string the date string
* @return a date object
*/
function makeDate(string) {
    var dateObj = new Date(string); 
    return dateObj; 
}

/**
 * Processes a list of descriptions by creating a new task 
 * object for each one, printing it to the console, adding it 
 * to the page
 * @param descriptions list of descriptions
 */
function processDescriptions(descriptions) {
    for (var i = 0; i < descriptions.length; i++) {
        var task = new Task(descriptions[i]); 
        console.log(task); 
        task.addToDom(); 
    }
}

class Task {
    /**
     * Constructors of object Task
     * @param dict the description dictionary (object representing task)
     */
    constructor(dict) {
        this.text = dict.text; 
        this.priority = dict.priority; 
        this.duedate = makeDate(dict.duedate); 
        this.tag = dict.tag; 
        this.id = null; 
        this.done = false; 
    }

    /**
     * @returns string of duedate
     */
    getFormattedDueDate() {
        var day = this.duedate.getDay(); 
        var the_date = this.duedate.getDate(); 
        var the_month = this.duedate.getMonth(); 
        var the_fullYear = this.duedate.getFullYear(); 
        return days[day] + " " + months[the_month] + " " + the_date + " " + the_fullYear + " "; 
    }

    /**
     * Creates LI for task, adds it to DOM
     * Object stores LI in instance variable (for later updating)
     * Background color set by lookin up tag in tagColors dictionary
     */
    addToDom() {
        var $li = $('<li></li>');
        $li.addClass("task"); 
        $li.css("background-color", tagColors[this.tag]); 
        $li.attr("data-taskId", this.id); 
        var $due = $('<span></span>').addClass("due").text(this.getFormattedDueDate()); 
        var $priority = $('<span></span>').addClass("priority").text(this.priority + " "); 
        var $tag = $('<span></span>').addClass("tag").text(this.tag); 
        var $text = $('<p></p>').addClass("text").text(this.text);
        var $but1 = $('<button></button>').addClass("markDone").html("&#x2714;");
        var $but2 = $('<button></button>').addClass("delete").html("&#x2716;");
        var $but3 = $('<button></button>').addClass("more").html("&#x271A;");
        $li.append($due);
        $li.append($priority);
        $li.append($tag); 
        $li.append($text);
        $li.append($but1);
        $li.append($but2); 
        $li.append($but3); 
        $("#theTasks").append($li); 
        // if the task is done, the "done" class is added
        if (this.done) {
            $(this.li).addClass("done"); 
        } else {
            $(this.li).removeClass("done"); 
        }
        //puts taskId on element as data-taskID attribute
        $li.attr('data-taskId', this.id);
        //stores li in instance variable of Task
        this.li = $li; 
    }

    /**
     * Sets ID of Task object
     * @param id the id to set
     */
    setId(id) {
        this.id = id; 
    }

    /**
     * @return ID of Task object
     */
    getId(id){
        return this.id; 
    }

    /**
     * If the task wasn't done, flips it to done (and vice versa)
     * Updates the display (if the task is "done", has the "done" class)
     */
    toggleDone() {
        if (this.done) {
            this.done = false; 
            $(this.li).removeClass("done"); 
        } else {
            this.done = true; 
            $(this.li).addClass("done"); 
        }
    }

    /**
     * Removes the DOM element of this task object
     */
    delete() {
        this.li.remove(); 
    }

}

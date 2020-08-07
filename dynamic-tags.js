/**
* FILE NAME: dynamic-tags.js
* WRITTEN BY: Alina Zheng
* DATE: 5/1/20
* PURPOSE: CS204 Taskmin
 */

 /**
  * Replaces static radio buttons with dynamic ones
  */
 function updateTags() {
    $("#tags").empty(); 
    var tag_keys = Object.keys(tagColors); //gets an array of the tags in tagColors
    // loop over the keys in tag colors, creates radio buttons for each
    for (var i = 0; i < tag_keys.length; i++) {
        $label = $("<label></label>").text(" " + tag_keys[i] + " "); 
        var $radBut = $('<input></input>', {
           'type': 'radio',
           'name': 'tag',
           'value': tag_keys[i], 
       }); 
       $("#tags").append($radBut); 
       $("#tags").append($label); 
    }
 }

var $currentDay = $("#currentDay");
var $timeBlocks = $(".time-block");
var $scheduleArea = $(".schedule");

var toDoItems = [];
//each object has an hour and text 
 
var currentDate = moment().format("dddd, MMMM Do");
var currentHour = moment().format("H");
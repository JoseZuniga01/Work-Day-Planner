var $currentDay = $("#currentDay");
var $timeBlocks = $(".time-block");
var $scheduleArea = $(".schedule");

var toDoItems = [];
//each object has an hour and text 
 
var currentDate = moment().format("dddd, MMMM Do");
var currentHour = moment().format("H");

//function to initialize schedular 
function initializeSchedule(){
    //  console.log(toDoItems);
    
    //for each time block
      $timeBlocks.each(function(){
        var $thisBlock = $(this);
        var thisBlockHr = parseInt($thisBlock.attr("data-hour"));
    
        var todoObj = {
          //set todo item to corresponding hour 
          hour: thisBlockHr,
          //have this open to accept string input from user 
          text: "",
        }
        //add user input to our todoitems array
        toDoItems.push(todoObj);
      });
    
      //once we have looped thru timeblocks, save this array of objects to local storage by stringifying it first
      localStorage.setItem("todos", JSON.stringify(toDoItems));
      //console.log(toDoItems);
    }
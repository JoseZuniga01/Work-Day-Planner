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

    //format time block colors. 3 colors depending on the time of day 'past, present, future'
function setUpTimeBlocks(){
    $timeBlocks.each(function(){
      var $thisBlock = $(this);
      var thisBlockHr = parseInt($thisBlock.attr("data-hour"));

      //add color to time blocks to show where we are in the day 
      if (thisBlockHr == currentHour) {
        $thisBlock.addClass("present").removeClass("past future");
      }
      if (thisBlockHr < currentHour) {
        $thisBlock.addClass("past").removeClass("present future");
      }
      if (thisBlockHr > currentHour) {
        $thisBlock.addClass("future").removeClass("past present");
      }
    });
}

// function to pull task from local storage into corresponding time block 
function renderSchedule(){
  
    toDoItems = localStorage.getItem("todos");
    toDoItems = JSON.parse(toDoItems);
  
    //loop thru array then assign the text to the timeBlock with data-hour equal to hour. 
    //make a variable where [data-hour={hour}] then plug it in to the selector $('[data-hour={hour}')
    for (var i = 0; i < toDoItems.length; i++){
      var itemHour = toDoItems[i].hour;
      var itemText = toDoItems[i].text; 
     
      $("[data-hour=" + itemHour + "]").children("textarea").val(itemText);
    }
  
    console.log(toDoItems);
  }


  function saveHandler(){
    var $thisBlock = $(this).parent();
  
    var hourToUpdate = $(this).parent().attr("data-hour");
    var itemToAdd = (($(this).parent()).children("textarea")).val();
  
    //see which item we need to update based on the hour of the button clicked matching
    for (var j = 0; j < toDoItems.length; j++){
      if (toDoItems[j].hour == hourToUpdate){
        //set its text to what was added to textarea
        toDoItems[j].text = itemToAdd;
      }
    }
    localStorage.setItem("todos", JSON.stringify(toDoItems));
    renderSchedule();
  }

  // when the document loads
$(document).ready(function(){

    //format the timeblocks depending on time
    setUpTimeBlocks();
    //if there's nothing for the todos in local storage
    if(!localStorage.getItem("todos")){
      //initialize the array of objects
      initializeSchedule();
    } //otherwise ignore becuase we pull from local storage
  
    //display today's date
    $currentDay.text(currentDate);
  
    //pull schedule from local storage
    renderSchedule();
    //when a todo input is put in and save button is clicked, save it in local storage
    $scheduleArea.on("click", "button", saveHandler);
    
  });
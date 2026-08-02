//DIZAD completed 03/09/17
$(document).ready(function() 
{
  //Instructions
    //alert("Set the 'Timer' and 'Break' period in minutes and press the 'Start' button to alternate the countdown between the two.");
  
  //Variable declarations
    var timerMins = 1;
    var breakMins = 1;
    var countDownMins = 0;
    var countDownSecs = 0;
    var counter = 0;
    var next = "timer";

  //Functions
    //This function updates the internal counters and display values
      function adjustCountdown(screenIDEntry, operatorEntry, timerTypeEntry)
        { if (timerTypeEntry == 'timer')
          {
             switch(operatorEntry)
              {
                case '+': timerMins++; break;
                case '-': if (timerMins > 1){timerMins--}; break;
                default: break;
              }
            $(screenIDEntry).html(timerMins);   
          }
         else if (timerTypeEntry == 'break')
          {
             switch(operatorEntry)
              {
                case '+': breakMins++; break;
                case '-': if(breakMins > 1){breakMins--}; break;
                default: break;
              }
            $(screenIDEntry).html(breakMins);   
          }
        }
  
    //This function performs the actual countdown
      function startCountdown()
        {
          switch(next)
          {
            case 'timer': $('#container1').css("background-image", "url(http://www.apsys-inc.com/DIZAD_Web_Libraries/Images/FreeCodeCamp/FCC08PomodoroClock/backgroundTimerOn.png)");
              countDownMins = timerMins - 1;
              next = 'break';
              break;
            case 'break': $('#container1').css("background-image", "url(http://www.apsys-inc.com/DIZAD_Web_Libraries/Images/FreeCodeCamp/FCC08PomodoroClock/backgroundBreakOn.png)");
              countDownMins = breakMins - 1;
              next = 'timer';
              break;
            default: break;
          }
          countDownSecs = 60;
          counter = setInterval(deductSeconds, 1000); //SetInternval is a built-in function for counting in js
        }
  
  //Display the countdown values
    function displayCountdown()
      { $('#screenCountdown').html(" " + countDownMins + " : " + countDownSecs);}
  
   //Iterate this function after every second per startCountdown()  
      function deductSeconds()
        {
          countDownSecs--;
          displayCountdown(); 
          //If theres still some minutes left
            if (countDownSecs <= 0 && countDownMins > 0)
              {
               countDownSecs = 60;
               countDownMins--;
              }
          //If it finished the time, swap to to next timeType
            else if (countDownSecs <= 0 && countDownMins <= 0) 
              {
                   clearInterval(counter); //Stop the interval
                startCountdown(next);
              }
        }

  //Click functions
    //Click the timer buttons
      $('#butPlusTimer').click(function(){adjustCountdown('#screenTimer','+','timer');}); //Click the butPlusTimer 
      $('#butMinusTimer').click(function(){adjustCountdown('#screenTimer','-','timer');}); //Click the butMinusTimer   
      $('#butPlusBreak').click(function(){adjustCountdown('#screenBreak','+','break');}); //Click the butPlusBreak 
      $('#butMinusBreak').click(function(){adjustCountdown('#screenBreak','-','break');}); //Click the butMinusBreak
   //Click the start button
      $('#butStart').click(function(){
        clearInterval(counter);
        startCountdown();}); //Starts the counter
   //Click the stop button
      $('#butStop').click(function(){alert('PAUSE!!');}); //Pauses the counter
});
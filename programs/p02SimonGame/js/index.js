//DIZAD Completed 03/15/17
$(document).ready(function()
  {
   //Provide game instructions
   //   alert("Play a memory game of Simon by matching the sequence of colors in the order that it is shown. Make sure that your sound is on."); 
  
   //Global variables
      var sequenceInMemory = [];
      var sequenceInPlayer = [];
      var randSimon = 0;
      var strictModeIsOn = false;
      var i01 = 0; //Sequence iterator
      var i02 = 0; //Used for the array match
      var i03 = 0; //Used for the array match
  
    //Audio variables & setup
      var audioGreen = document.createElement("audio");
      var audioRed = document.createElement("audio");
      var audioBlue = document.createElement("audio");
      var audioYellow = document.createElement("audio"); 
      var startSound = document.createElement("audio");
      var clickButton = document.createElement("audio");
      var screenSwitch = document.createElement("audio");
      var correct = document.createElement("audio");
      var incorrect = document.createElement("audio");
      var winGame = document.createElement("audio");  
  
      audioGreen.src="https://s3.amazonaws.com/freecodecamp/simonSound1.mp3";
      audioRed.src="https://s3.amazonaws.com/freecodecamp/simonSound2.mp3";
      audioBlue.src="https://s3.amazonaws.com/freecodecamp/simonSound3.mp3";
      audioYellow.src="https://s3.amazonaws.com/freecodecamp/simonSound4.mp3";
      startSound.src="http://www.apsys-inc.com/DIZAD_Web_Libraries/Sounds/startGame.mp3";
      clickButton.src="http://www.apsys-inc.com/DIZAD_Web_Libraries/Sounds/clickButton.wav";
      screenSwitch.src="http://www.apsys-inc.com/DIZAD_Web_Libraries/Sounds/screenSwitch.wav";
      correct.src="http://www.apsys-inc.com/DIZAD_Web_Libraries/Sounds/correct.mp3";
      incorrect.src="http://www.apsys-inc.com/DIZAD_Web_Libraries/Sounds/incorrect.mp3";
      winGame.src="http://www.apsys-inc.com/DIZAD_Web_Libraries/Sounds/winGame.mp3";
  
  //Functions
    //Start
      function start()
        {
          startSound.play();
          sequenceInMemory = []; //Empty the array
          $('#labelStatus').html("Restarting...");
          setTimeout(function(){ cycleSequence(); }, 2000);
        }

    //Run sequence
      function cycleSequence()
        {
          //Add to array
            $('#labelStep').html(sequenceInMemory.length + 1);
            $('#labelStatus').html("Watch..."); screenSwitch.play();
            setASimon();
          //Update display
            for (i01 = 0; i01 < sequenceInMemory.length; i01++)
              { playStep(i01); }
          //Player turn
            setTimeout(function(){playerTurn();}, 2000 + 1500 * sequenceInMemory.length); 
        }
  
    //Player turn
      function playerTurn()
        {
          sequenceInPlayer = []; //Empty the array
          $('#labelStatus').html("Now you try!"); screenSwitch.play();
          //NOTE: The check code is happening inside the click event expressions
        }
  
    //Checks to see if player sequence matches sequence in memory 
      function doesSequenceMatch()
        {
          //If the length matches, check for match
          if(sequenceInPlayer.length == sequenceInMemory.length)
            {
              for (i02 = 0;  i02 < sequenceInMemory.length; i02++)
                {
                  if (sequenceInMemory[i02] != sequenceInPlayer[i02])
                    { return false;}
                }
              return true; //If it went through the loop without returning false, then it returns true
            }
        }

     //Converts index to simon class element
        function convertToClassElement(indexEntry)
          {
            switch(indexEntry)
              {
                case 0: audioGreen.play(); return ".butGreen";  break;
                case 1: audioRed.play(); return ".butRed";  break;
                case 2: audioBlue.play(); return ".butBlue";  break;
                case 3: audioYellow.play(); return ".butYellow"; break;
                default: break;
              }
          }
  
    //Display the simon change on the board
      function energizeSimon(classEntry)
        {
          $(classEntry).toggleClass("lighten");
          setTimeout(function(){  $(classEntry).toggleClass("lighten");}, 1000); 
        }

    //Determine downstream based on whether there is a sequence match
      function checkForMatch()
        {
          if(doesSequenceMatch() === true)
            {
              setTimeout(function(){
                $('#labelStatus').html("Correct!"); correct.play();
                setTimeout(function(){
                  $('#labelStatus').html("Moving on..."); screenSwitch.play();
                  setTimeout(function(){
                    cycleSequence(); 
                  }, 1000);
                }, 2000);
              }, 1000);
            }
          else if(doesSequenceMatch() === false)
          {
            setTimeout(function(){
              $('#labelStatus').html("Incorrect!"); incorrect.play();
              setTimeout(function(){
                if (strictModeIsOn === false){
                  $('#labelStatus').html("Watch again!"); screenSwitch.play();
                  setTimeout(function(){
                    for (i01 = 0; i01 < sequenceInMemory.length; i01++)
                    { playStep(i01); }
                    setTimeout(function(){playerTurn();}, 2000 + 1500 * sequenceInMemory.length); 
                  }, 1000);
                }
                else if (strictModeIsOn === true)
                { setTimeout(function(){ start();}, 1000); }
              }, 1000);
            }, 1000);
            sequenceInPlayer = []; //Reset the array
          }
        }
  
   //Win routine
      function youWin()
        {
          winGame.play();
          alert("You Win!!");
          window.location.reload(false); //reloads page
        }

    //Pick a random simon
      function setASimon()
        {
          randSimon = Math.round(Math.random() * 3); //Rand number between 0 and 3 inclusive
          sequenceInMemory.push(randSimon); //Add to sequence
          //Check for win after 20 turns
          if (sequenceInMemory.length > 20) //Change 20 to any other winning turn
            { youWin(); }
        }
  
   //Play a simon step    
      function playStep(indexEntry)
        { setTimeout(function(){ energizeSimon(convertToClassElement(sequenceInMemory[indexEntry]));}, 1500 * (indexEntry + 1)); }   
  
 //Button clicks
      //[START] button
         $('.butStart').click(function(){ start(); });

      //[STRICT] button
         $('.butStrict').click(function()
            { 
                clickButton.play();
              //Toggle the value
                if (strictModeIsOn == false)
                  { strictModeIsOn = true; }
                else if (strictModeIsOn == true)
                  { strictModeIsOn = false; }
              //Toggle the display
                $(".butStrict").toggleClass("butStrictLighten");
            });
  
      //Simon buttons
        $('.butGreen').click(function()
          {
            audioGreen.play();
            sequenceInPlayer.push(0);
            checkForMatch();
          }); 
  
        $('.butRed').click(function()
          {
            audioRed.play();
            sequenceInPlayer.push(1); 
            checkForMatch();
          });
  
        $('.butBlue').click(function()
          {
            audioBlue.play();
            sequenceInPlayer.push(2); 
            checkForMatch();
          });
  
        $('.butYellow').click(function()
          {
            audioYellow.play();
            sequenceInPlayer.push(3); 
            checkForMatch();
          });
  }); //End of DOM check
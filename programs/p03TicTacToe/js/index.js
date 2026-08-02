//DIZAD Completed 03/10/17
  $(document).ready(function() //Start of DOM check
    {
      //Alert instructions
     //   alert("Select a symbol, press [START], and play a game of Tic Tac Toe against the computer.");
      //Variable declarations
        var playerSymbol = 'X';
        var enemySymbol = '0';
        var startGame = false;
        var randNumber = 0;
        var randID = "";
        var whileCounterControl = 0;
        var playerTurn = true;

      //General functions
        //Reset game function
          function resetGame()
           {
             //Empty the board
               $('#00').empty();
               $('#10').empty();
               $('#20').empty();
               $('#01').empty();
               $('#11').empty();
               $('#21').empty();
               $('#02').empty();
               $('#12').empty();
               $('#22').empty();
             //Empty the strikes
               $(".strikeContainer").empty();
             //Reset the counter
               whileCounterControl = 0;
             //Reset game
               startGame = false;
            }
    
        //Enemy play function
         function enemyPlay()
          { 
            do{
              //Pick a random box to drop a symbol
                randNumber = Math.round(Math.random() * 8);
              //Cross-reference
                switch(randNumber)
                    {
                      case 0: randID = '#00'; break;
                      case 1: randID = '#10'; break;
                      case 2: randID = '#20'; break;
                      case 3: randID = '#01'; break;
                      case 4: randID = '#11'; break;
                      case 5: randID = '#21'; break;
                      case 6: randID = '#02'; break;
                      case 7: randID = '#12'; break;
                      case 8: randID = '#22'; break;
                      default: break; 
                    }
            }
            while($(randID).html() != "" && whileCounterControl < 4)//counterControl to protect against an infinite loop
              //Notify if there is a tie
                if (whileCounterControl >= 4)
                  {  
                    startGame = false;
                    alert('TIE!');
                    window.location.reload(false);
                  }
                else
                  { whileCounterControl++; }                 
              //Increment the counter   
                console.log(whileCounterControl);
              //This is just to update the enemy symbol on the board
                //It uses a random duration that is currently set to zero
                 $('.fontTitle').css("color", "green"); 
                 randNumber = Math.round(Math.random() * 0); //Adjust the 0 for adding a duration
                 setTimeout(function()
                   { 
                    $(randID).html(enemySymbol); 
                    $('.fontTitle').css("color", "dimGray");
                    checkForWin(enemySymbol);
                    playerTurn = true;
                  }, randNumber); //Run after a random time  
          }
    
        //Find the red strikes after a connect 3
          function findStrike(coor1Entry, coor2Entry, coor3Entry, idEntry, symbolEntry)
            {
              if($(coor1Entry).html() == symbolEntry && $(coor2Entry).html() == symbolEntry && $(coor3Entry).html() == symbolEntry) 
                 {
                 $(".strikeContainer").append("<div class = 'strikeDefault' id = " + idEntry + "></div>");
                   startGame = false; //Reset the game
                 }
            }
    
        //Check for win function
          function checkForWin(symbolEntry)
            {
              //Horizontal lines
              findStrike('#00', '#10', '#20', 'strikeY0', symbolEntry);
              findStrike('#01', '#11', '#21', 'strikeY1', symbolEntry);
              findStrike('#02', '#12', '#22', 'strikeY2', symbolEntry);
              //Vertical lines
              findStrike('#00', '#01', '#02', 'strikeX0', symbolEntry);
              findStrike('#10', '#11', '#12', 'strikeX1', symbolEntry);
              findStrike('#20', '#21', '#22', 'strikeX2', symbolEntry);
              //Diagonals
              findStrike('#00', '#11', '#22', 'strikeDL', symbolEntry);
              findStrike('#02', '#11', '#20', 'strikeDR', symbolEntry);
            }

      //Click functions
        //Select Start button
          $('#butStart').click(function()
              { 
                resetGame();
                startGame = true;
              }); 
    
        //Select X symbol
          $('#xSymbol').click(function()
              {
                playerSymbol = 'X';
                enemySymbol = '0';
                $('#dropdownHead').html(playerSymbol);
              }); 
    
        //Select O symbol
          $('#oSymbol').click(function()
              { 
            //resetGame();
                enemySymbol = 'X';
                playerSymbol = '0';
                $('#dropdownHead').html(playerSymbol);
              });
    
      //Select a box on the board
        function clickBox(idEntry)
          {
             $(idEntry).click(function()
                { 
               if (startGame === true)
                 {
                   if ($(idEntry).html() != enemySymbol && $(idEntry).html() != playerSymbol && playerTurn == true)
                     { 
                       $(idEntry).html(playerSymbol);
                       checkForWin(playerSymbol); 
                       if (startGame === true)
                         {
                          //enemy plays
                            playerTurn = false;
                            enemyPlay();
                         }
                      }
                 }
               else if (startGame === false)
                 { $('#butStart').effect( "pulsate", {times:2}, 500); }
                });
          }
    clickBox('#00');
    clickBox('#10');
    clickBox('#20');
    clickBox('#01');
    clickBox('#11');
    clickBox('#21');
    clickBox('#02');
    clickBox('#12');
    clickBox('#22');
    }); //End of DOM check
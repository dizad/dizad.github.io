//DIZAD Completed 03/03/17
$('document').ready(function()
{
	/*alert("Use the KEYBOARD or MOUSE to calculate anything you like.\n Here are the keystroke definitions:\n"+
			"[SPACE]= clear\n[ENTER]= Calculate\n[1 - 9]= 1 - 9\n[+] = +\n[-] = -\n[X] = *\n[/] = /\n Also, try typing a really long expression!");  
      */

	//Variable declarations
		var expressionInMem = "";
		var expressionResult = 0;

	//Functions
		//This function removes the "clear" comment after clicking
			function initialize()
				{if ( expressionInMem == ''){ $('#screen').html('');}}
				
		//This is just a fun function for an overload on the string length
			function checkLength()
				{ //Overflow warnings
					 if (expressionInMem.length == 20)
					  {alert("Is that the longest string you can type??");}
					 if (expressionInMem.length == 30)
					  {alert("Yawwwnnnnnn!!!");}
					 if (expressionInMem.length == 40)
						  {alert("Uh Oh, I think something's wrong!!!");
						   danger();  
				}}
				
		//Danger functions		
			function danger()
				{
					$('#screen').effect('explode', 'slow',
					  function(){ $('#butClear').effect('explode', 'fast',
					  function(){$('#butTwo').effect('explode', 'fast',
					  function(){$('#butPlus').effect('explode', 'fast',
					  function(){$('#butMinus').effect('explode', 'fast',
					  function(){$('#butZero').effect('explode');});});});});});

					$('#screen').effect('explode', 'slow',
					  function(){ $('#butDivide').effect('explode', 'fast',
					  function(){$('#butMultiply').effect('explode', 'fast',
					  function(){$('#butEight').effect('explode', 'fast',
					  function(){$('#butSeven').effect('explode', 'fast',
					  function(){$('#butFour').effect('explode');});});});});});

					$('#screen').effect('explode', 'slow',
					  function(){ $('#butOne').effect('explode', 'fast',
					  function(){$('#butNine').effect('explode', 'fast',
					  function(){$('#butEqual').effect('explode', 'fast',
					  function(){$('#butThree').effect('explode', 'fast',
					  function(){$('#butSix').effect('explode', 'fast', 
					  function(){$('body').fadeOut();});});});});});});

					$('body').css('background-color', 'red');
				} 

		//This function executes the button that is pressed
			function pressButton(buttonSymbol)
				{
					checkLength();
					initialize();
					$('#screen').html($('#screen').html() + buttonSymbol);
					expressionInMem += buttonSymbol;
				}
		
	//Main button events
		$('body').keypress(function(entry){ if(entry.keyCode === "+".charCodeAt(0)){ pressButton('+'); }}); //Keyboard		
		$('#butPlus').click(function() {pressButton('+');}); //Mouse
		$('body').keypress(function(entry){ if(entry.keyCode === "-".charCodeAt(0)){ pressButton('-'); }}); //Keyboard	
		$('#butMinus').click(function() {pressButton('-');}); //Mouse
		$('body').keypress(function(entry){ if(entry.keyCode === "*".charCodeAt(0)){ pressButton('*'); }}); //Keyboard	
		$('#butMultiply').click(function() {pressButton('*');}); //Mouse
		$('body').keypress(function(entry){ if(entry.keyCode === "/".charCodeAt(0)){ pressButton('/'); }}); //Keyboard	
		$('#butDivide').click(function() {pressButton('/');}); //Mouse
		$('body').keypress(function(entry){ if(entry.keyCode === ".".charCodeAt(0)){ pressButton('.'); }}); //Keyboard	
		$('#butDot').click(function() {pressButton('.');}); //Mouse
		$('body').keypress(function(entry){ if(entry.keyCode === "9".charCodeAt(0)){ pressButton('9'); }}); //Keyboard	
		$('#butNine').click(function() {pressButton('9');}); //Mouse
		$('body').keypress(function(entry){ if(entry.keyCode === "8".charCodeAt(0)){ pressButton('8'); }}); //Keyboard	
		$('#butEight').click(function() {pressButton('8');}); //Mouse
		$('body').keypress(function(entry){ if(entry.keyCode === "7".charCodeAt(0)){ pressButton('7'); }}); //Keyboard	
		$('#butSeven').click(function() {pressButton('7');}); //Mouse
		$('body').keypress(function(entry){ if(entry.keyCode === "6".charCodeAt(0)){ pressButton('6'); }}); //Keyboard	
		$('#butSix').click(function() {pressButton('6');}); //Mouse
		$('body').keypress(function(entry){ if(entry.keyCode === "5".charCodeAt(0)){ pressButton('5'); }}); //Keyboard	
		$('#butFive').click(function() {pressButton('5');}); //Mouse
		$('body').keypress(function(entry){ if(entry.keyCode === "4".charCodeAt(0)){ pressButton('4'); }}); //Keyboard	
		$('#butFour').click(function() {pressButton('4');}); //Mouse
		$('body').keypress(function(entry){ if(entry.keyCode === "3".charCodeAt(0)){ pressButton('3'); }}); //Keyboard	
		$('#butThree').click(function() {pressButton('3');}); //Mouse
		$('body').keypress(function(entry){ if(entry.keyCode === "2".charCodeAt(0)){ pressButton('2'); }}); //Keyboard	
		$('#butTwo').click(function() {pressButton('2');}); //Mouse
		$('body').keypress(function(entry){ if(entry.keyCode === "1".charCodeAt(0)){ pressButton('1'); }}); //Keyboard	
		$('#butOne').click(function() {pressButton('1');}); //Mouse
		$('body').keypress(function(entry){ if(entry.keyCode === "0".charCodeAt(0)){ pressButton('0'); }}); //Keyboard	
		$('#butZero').click(function() {pressButton('0');}); //Mouse

	//Other button events
		//Clear button
			$('body').keypress(function(entry){ if(entry.keyCode === 32)
				{ //Keyboard
				  initialize();
				  $('#screen').html('[clear]');
				  expressionInMem = '';
				}}); 
			$('#butClear').click(function() 
				{ //Mouse
			      initialize();
				  $('#screen').html('[clear]');
				  expressionInMem = '';
				});	 
		
		//Equal button
			$('body').keypress(function(entry){ if(entry.keyCode === 13)
				{ //Keyboard
					initialize();
					expressionResult = eval(expressionInMem);
					$('#screen').html(expressionResult);
				}}); 
			$('#butEqual').click(function() 
				{ //Mouse
					initialize();
					expressionResult = eval(expressionInMem);
					$('#screen').html(expressionResult);
				}); 
});
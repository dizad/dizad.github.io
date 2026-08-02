//DIZAD completed 02/10/17
var unitEntry = 'metric'; //imperial + metric
$(document).ready(function()
  { 
  alert("This APP will return the weather of your location.  Press the IMPERIAL or METRIC button to switch units.\n\nNOTE: If your browser does not allow location access, the API results will not return.  You will need to allow access either through the browser pop-up, settings, or using a different browser.");
    callAPI();//Call the API metrics
	switchUnits();
    displayDate();
  });

function switchUnits()
  {
    $('#imperial').click(function()
      {
        unitEntry = 'imperial';
        callAPI(); //Resets the call so the units update
        $('#imperial').addClass('buttonPressed');
        $('#metric').removeClass('buttonPressed');
      });
    $('#metric').click(function()
      {
        unitEntry = 'metric';
        callAPI(); //Resets the call so the units update
        $('#metric').addClass('buttonPressed');
        $('#imperial').removeClass('buttonPressed');
      }); 
  };
  
//Get the date
	function displayDate()
	  {
		var today = new Date();
		$('#date').html(today.toDateString() +':'+ today.getHours() +':'+ today.getMinutes());
	  };

//Create the core URL
	function buildURL(latEntry, lonEntry, unitEntry)
	  {
		var apiKey = '7435ca59e2aece7e71eaba28d00c905a'; //Provided
		return 'http://api.openweathermap.org/data/2.5/weather?lat=' + latEntry + '&lon=' + lonEntry + '&units=' + unitEntry + '&appid=' + apiKey;
	  };

//Get the latitude and longitude values
var latGEO = 41.505493; //41.45 //Set the defaults  
var lonGEO = -81.681290; //-81.48 //Set the defaults

 if (navigator.geolocation) 
 {
  navigator.geolocation.getCurrentPosition(function(position) 
   {
    latGEO = position.coords.latitude; 
    lonGEO = position.coords.longitude;
   })
 }
 
//Calls API for weather information
	function callAPI()
	  {    
      var coreURL = buildURL(latGEO, lonGEO, unitEntry);
      //getJSON will take the url and insert it into updateHTML
      $.getJSON(coreURL , updateHTML);
	  };

//Convert the units
  function unitConversion(entry, conversionType)
    {
    //Temperature conversion
        if (conversionType == 'temp')
          {
            if(entry == 'imperial')
              {return 'F'}
            else if(entry == 'metric')
              {return 'C'}
          } 
    //Wind speed conversion
      else if(conversionType == 'speed')
        {
          if(entry == 'imperial')
            {return 'mph'}
          else if(entry == 'metric')
            {return 'm/s'}
        }
	};

function updateHTML(entry)
  {
    //Place the API variables inside custom simplified variables
      var currentTemp = entry.main.temp;
      var maxTemp = entry.main.temp_max;
      var minTemp = entry.main.temp_min;
      var skyDescription = entry.weather[0].description;
      var windSpeed = entry.wind.speed;
      var windDirection = entry.wind.deg;
      var city = entry.name;
      var country = entry.sys.country;
      var pressure = entry.main.pressure;
      var humidity = entry.main.humidity;
      var seaLevel = entry.main.sea_level;
      var gndLevel = entry.main.grnd_level;
      var weatherID = entry.weather[0].id;
    //Build the URL
      var content = "'" + "'";
          
    //Display the url values
       $('#currentTemp').html(currentTemp + String.fromCharCode(176) + unitConversion(unitEntry,'temp'));
       $('#maxMinTemp').html(maxTemp + ' / ' + minTemp + String.fromCharCode(176) + unitConversion(unitEntry,'temp'));
       $('#location').html(city + ' / ' + country);
       $('#skyDescription').html(skyDescription);
       $('#windSpeed').html(windSpeed); 
       $('#speedUnit').html(unitConversion(unitEntry,'speed'));     
       $('#windDirection').html(Math.round(windDirection));   
       $('#humidity').html(humidity);
       $('#pressure').html(pressure);
       $('#seaLevel').html(seaLevel);
       $('#gndLevel').html(gndLevel);  //gndLevel
    
    //update diagram
    if (weatherID >= 701 && weatherID <= 800) //Sun ID range
      {$('#diagram').addClass('cloud');}
		else if (weatherID >= 200 && weatherID <= 531) //Rain ID range
      {$('#diagram').addClass('sun');}
		else if (weatherID >= 801 && weatherID <= 804) //cloud ID range 
      {$('#diagram').addClass('cloud');}  
		else {$('#diagram').addClass('cloud');}
    //For all weather conditions: https://openweathermap.org/weather-conditions
  };
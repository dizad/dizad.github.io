//DIZAD completed 02/28/17
//Provide instructions
  //alert("This pen uses the twitchTV API to display ONLINE/OFFLINE status.");

//Define accounts
  var accounts = ["ESL_SC2","OgamingSC2","cretetion","freecodecamp","storbeck","habathcx","RobotCaleb","noobs2ninjas","brunofin","comster404"];
  //var accounts = ["ESL_SC2","cretetion","freecodecamp","noobs2ninjas"];

//Main function
  function generateCalltags(channelEntry, displayRequestEntry) {
  
    //Local variables
      var coreURL = "https://wind-bow.gomix.me/twitch-api";
      var accountURL = "";
      var accountClosedHTML = "";
      var status = "";
      var accountHTML = "";
      var breakHTML = "<div class = 'break'><em>Twitch Account:</em></div>";
      var logoHTML = "";
      var statusHTML = "";
      var streamingHTML = "";
      var channelHTML = "";
      var bannerHTML = "";

    //Functions
      //Generates a url to use on the getJSON 
        function specifyURL(apiTypeEntry , accountURLEntry) 
          {
            accountURL = coreURL + '/' + apiTypeEntry + '/' + accountURLEntry + '?callback=?';
            return accountURL;
          };
    
    //getJSON API Concatination
      $.getJSON(specifyURL("streams", channelEntry), function(dataStream) {
        if (dataStream.stream === null || dataStream.stream === undefined) //Find out if account is OFFLINE 
          {
            status = "offline";
            statusHTML = "<span class = 'fontOffline'>OFFLINE</span>";
          }
        else //Find out if account is ONLINE 
          {
            status = "online";
            statusHTML = "<span class = 'fontOnline'>ONLINE</span>";
            streamingHTML = "<span class = 'fontTwitchSlabStreaming'><strong>Streaming:</strong>" + dataStream.stream.game + " " + dataStream.stream.channel.status + "</span>";
          };
        
    //Concatinate given the API info
      $.getJSON(specifyURL("channels", channelEntry), function(dataChannel) {
        
        //Define logoHTML
          if (dataChannel.logo != null)
            { logoHTML = dataChannel.logo }
          else
            { logoHTML = "http://www.apsys-inc.com/DIZAD_Web_Libraries/Images/X.JPG"; }
        
        //Define accountClosedHTML  
          if (dataChannel.status != 404)
            { accountClosedHTML = ""; }
          else
            { accountClosedHTML = "<span class = 'fontClosed'> [Account is closed or never existed]</span>";}          
          
        //Define bannerHTML
          if (dataChannel.profile_banner != null)
            { bannerHTML = dataChannel.profile_banner }
          else
            { bannerHTML = "http://www.apsys-inc.com/DIZAD_Web_Libraries/Images/X.JPG"; }
        
        //Define bannerHTML     
            channelHTML =  "<a target = 'blank' href=" + dataChannel.url + "><div class = 'butTwitchSlab' style = 'background-image: url(" + bannerHTML + ");'><img class = 'logoStyle' src=" + logoHTML + "><span class = 'fontTwitchSlabTitle'> " + channelEntry  + "</span></div></a>";
        
        //Performthe master concatination
            accountHTML = breakHTML + statusHTML + accountClosedHTML + streamingHTML + channelHTML; 
        
        //Display ALL, ONLINE, or OFFLINE depending on displayRequestEntry
          //If request is to display ALL, display OFFLINE and ONLINE
               if (displayRequestEntry === "ALL")
                 {
                   if (status === "online")
                    { $("#twitchResults").prepend(accountHTML); }
                   else if (status === "offline")
                    { $("#twitchResults").append(accountHTML); }
                 }
            //If request is to display ONLINE only, display ONLINE
              else if (displayRequestEntry === "ONLINE")
                {
                  if (status === "online")
                    { $("#twitchResults").prepend(accountHTML); }
                }
            //If request is to display OFFLINE only, display OFFLINE
              else if (displayRequestEntry === "OFFLINE")
                {
                  if (status === "offline")
                    { $("#twitchResults").append(accountHTML); }
                }            
    }); //End of GETJSON channels
  }); //End of GETJSON streams
}; //End of generateCalltags

$(document).ready(function(){//Start of DOM check function
  
  //By default, display all channels
     for(var i01 = 0; i01 < accounts.length; i01++)
      { generateCalltags(accounts[i01], "ALL"); }
  
  //Button presses
    //Press the [ALL] button
      $("#butAll").on("click", function()
        { 
          $(".twitchResultsClass").empty();
        for (var i01 = 0; i01 < accounts.length; i01++)
          { generateCalltags(accounts[i01], "ALL"); }
        });

    //Press the [ONLINE] button  
      $("#butOnline").on("click", function()
        { 
          $(".twitchResultsClass").empty();
          for (var i01 = 0; i01 < accounts.length; i01++)
          { generateCalltags(accounts[i01], "ONLINE"); }
        });
  
    //Press the [OFFLINE] button  
      $("#butOffline").on("click", function()
        { 
          $(".twitchResultsClass").empty();
          for (var i01 = 0; i01 < accounts.length; i01++)
          { generateCalltags(accounts[i01], "OFFLINE"); }
        });
}); //End of DOM check function
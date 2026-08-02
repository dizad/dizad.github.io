//DIZAD completed 02/08/17
$('document').ready(function()
	{
  //alert("Type a keyword and select [SEARCH] to display related wikipedia articles.  Selet [RANDOM] for a random wikipedia article.");
		$("#butSEARCH").on("click", function()
			{
        //Collect what is typed in the entry box
				  var boxInput = $('#entryBox').val();
        //Construct the wikipedia link
				  var coreURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ boxInput +"&format=json&callback=?"; //Core url
				//Ajax syntax for constructing URL
				  $.ajax
					({
						url: coreURL,
						type: 'GET',
						contentType: "application/json; charset=utf-8",
						async: false,
						dataType: "json",
						success: function(data, status, jqXHR) 
							{
							  $("#wikiResults").html(); //Location of output
							  for(var i=0; i < data[1].length; i++)
								  {
                    $("#wikiResults").prepend("<a target = '_blank' href="+data[3][i]+"><div class = 'butWiki'><span class = 'fontWikiTitle'>" + data[1][i]+ "</span>" + "<div><span class = 'fontWikiSubTitle'>" + data[2][i] + "</span></div></div></a>");
								  }
							}
					})
				.done(function(){console.log("no results!");})
				.fail(function(){console.log("fail!");})
				.always(function(){console.log("complete!");});
			});
	});
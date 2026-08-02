//DIZAD completed 01/10/17
//initializer
$(document).ready(function(){});
//alert("Press the buttons on the upper banner to move to location.");
//scroll to element
$("#butAbout").click(function() 
{
  $('html, body').animate({
      scrollTop: $("#about").offset().top - 48
  }, 1000);    
});

$("#butTraining").click(function() 
{
  $('html, body').animate({
      scrollTop: $("#training").offset().top - 48
  }, 1000);    
});

$("#butLanguages").click(function() 
{
  $('html, body').animate({
      scrollTop: $("#languages").offset().top - 48
  }, 1000);    
});

$("#butProjects").click(function() 
{
  $('html, body').animate({
      scrollTop: $("#projects").offset().top - 48
  }, 1000);    
});

$("#butLinks").click(function() 
{
  $('html, body').animate({
      scrollTop: $("#links").offset().top - 48
  }, 1000);    
});
// displays the lower banner

$('document').ready(function(){
	$('.lowerBanner').html(
		'<div>'+
		'<a href = "https://www.linkedin.com/profile/preview?locale=en_US&trk=prof-0-sb-preview-primary-button" target="_blank" class = "refIcon"><i class = "fa fa-fw fa-linkedin"></i></a>' + 
		'<a href = "https://github.com/dizad/" target="_blank" class = "refIcon"><i class = "fa fa-fw fa-github"></i></a>' +
		'<a href = "https://www.freecodecamp.com/dizad87" target="_blank" class = "refIcon"><i class="fa fa-free-code-camp" aria-hidden="true"></i></a>' +
		'</div><br><span style="filter:brightness(200%); font-size: 12px;">version: <strong>2.19</strong> - last update: <strong>08 / 02 / 26</strong></span>'
	);
});
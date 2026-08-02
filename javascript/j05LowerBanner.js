//This script displays the lower banner

	$('document').ready(function()
		{//Start of DOM check
			$('.lowerBanner').html(
					'<div>'+
						'<a href = "https://www.linkedin.com/profile/preview?locale=en_US&trk=prof-0-sb-preview-primary-button" target="_blank" class = "refIcon"><i class = "fa fa-fw fa-linkedin"></i></a>' + 
						'<a href = "https://github.com/DIZAD87" target="_blank" class = "refIcon"><i class = "fa fa-fw fa-github"></i></a>' +
						'<a href = "https://www.freecodecamp.com/dizad87" target="_blank" class = "refIcon"><i class="fa fa-free-code-camp" aria-hidden="true"></i></a>' +
					'</div><br><span style="filter:brightness(200%); font-size: 12px;">version: 2.19 - last update: 08/02/26</span>'
				);
		});//End of DOM check
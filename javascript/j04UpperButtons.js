//This script displays the upper buttons

	$('document').ready(function()
		{//Start of DOM check
			$('.upperButtons').html(
				'<div>' +
					'<tr>'+
						//Button Home
							'<td>' + 
								'<div class = "dropdown" >' +
										'<a href="index.html" class="dropbtn" id = "dropdownHead"><span class = "iconSize"><i class = "fa fa-home "></span></i>Home</a>' +
								'</div>' +
							'</td>'+
							
						//Button Skills
							'<td>'+
								'<div class="dropdown">'+
										'<span class = "dropbtn" style = "cursor: auto;"><span class = "iconSize"><i class = "fa fa-globe"></i></span> Skills</span>'+
											'<div class="dropdown-content">'+
											  '<a href = "w19ArtificialIntelligence.html">Software (AI)</a>'+
											  '<a href = "w02Software.html">Software (Full Stack)</a>'+
											  '<a id = "" href = "w03Mechatronics.html">Mechatronics</a>'+
											  '<a href = "w04Mechanics.html">Mechanics</a>'+
											  '<a id = "" href = "w05Media.html">Media</a>'+
											  '<a href = "w06Management.html">Management</a>'+
											  '<a id = "" href = "w07Teaching.html">Teaching</a>'+
											'</div>'+
								'</div>'+
							'</td>'+
							
						//Button Education
							'<td>'+
								'<div class="dropdown">'+
									'<span class="dropbtn" style = "cursor: auto;"><span class = "iconSize"><i class = "fa fa-graduation-cap"></i></span> Education</span>'+
										'<div class="dropdown-content">'+
										  '<a href = "w08Degrees.html">Degrees</a>'+
										  '<a id = "" href = "w09Certificates.html">Certificates</a>'+
										  '<a href = "w10OnlineAcademies.html">Online Academies</a>'+
										  '<a id = "" href = "w11CorporateTraining.html">Corporate Training</a>'+
										'</div>'+
								'</div>'+
							'</td>'+
						
						//Button Other
							'<td>'+
								'<div class="dropdown">'+
									'<span class="dropbtn" style = "cursor: auto;"><span class = "iconSize"><i class = "fa fa-gear"></i></span> Other</span>'+
										'<div class="dropdown-content">'+
										  '<a id = "" href = "w13Recognition.html">Recognition</a>'+
										  '<a href = "w12Inventions.html">Inventions</a>'+
										  '<a href = "w14Volunteer.html">Volunteer</a>'+
										  '<a id = "" href = "w15Organizations.html">Organizations</a>'+
										  '<a href = "w16Languages.html">Languages</a>'+
										  '<a href = "w18Values.html">Values</a>'+
										'</div>'+
								'</div>'+
							'</td>'+
						
						//Button Contact
							'<td>' +
								'<div class = "dropdown">' +
									'<a href = "w17Contact.html" class="dropbtn"><span class = "iconSize"><i class = "fa fa-envelope-o"></i></span> Contact</a>' +
								'</div>' +
							'</td>' +
					'</tr>' +
					'<!--End of upper banner-->' +
				'</div>'
				);
		});//End of DOM check
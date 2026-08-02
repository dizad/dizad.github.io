//DIZAD completed 04/29/17
$('document').ready(function(){
//alert('Drag the nodes to adjust the force field.');
//General variables
	//Chart variables
		var chart = 
			{
				width: 900,
				height: 600
			}
		
	//Node variables
		var node = 
			{
				distance: 25,
				charge: -150
			}

	//Define inital container
		var container = d3.select('.d3Content')
			.style('width', chart.width + 'px')

	//Define the svg
		var svg = container.append('svg')
			.attr('width', chart.width)
			.attr('height', chart.height);
  
  //Add toolTip
			var tooltip = d3.select(".d3Content")
				.append("div")
				.attr("class", "tooltip")
				.style("opacity", 0);
  
  //Read the data
	  $.getJSON('https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json').success(function(dataEntry)
		  {
			//Variables
				//Nodes and link variables
					var nodes = dataEntry.nodes;
					var links = dataEntry.links;
				
				//Create the force-directed graph
					var force = d3.layout.force()
					  .size([chart.width, chart.height])
					  .nodes(nodes)
					  .links(links)
					  .charge(node.charge)
					  .linkDistance(node.distance);
				
				//Create the link
					var link = svg.selectAll('.link')
					  .data(links)
					  .enter().append('line')
					  .attr('class', 'link');
				
				//Create the flags
					var flag = container.selectAll('img')
					
			//Attach the image to the flags
				.data(nodes)
				.enter().append('img')
				.attr('class', d => 'flag flag-' + d.code)
        
			//Mouseover
				flag.on('mouseover', function(d) 
				  { 
					//Change border color
						d3.select(this)
							.style("transform", 'scale(2,2)')
							.style('border-color', 'lime')
					//Add toolkit
						tooltip.transition()
							.duration(100)
							.style("opacity", 1);
					//Render the tooltip
						tooltip.html("<span><span id='fontBold'>Country: </span> " + d.country + "</span><br><span><span id='fontBold'>Code: </span>" + d.code + "</span>")
							.style("left", (d3.event.pageX - 550) + "px")
							.style("top", (d3.event.pageY - 110) + "px");
				  })
      
        //Mouseout
            flag.on('mouseout', function(d) 
              { 
                //Resume border color
                  d3.select(this)
                  .style("transform", 'scale(1,1)')
                  .style('border-color' , 'green');
                //Remove toolkit
                  tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            }).call(force.drag);
					
		//Dynamically position the nodes and links
			force.on('tick', function()
				{
					//Draw flag
					  flag.style('left', (d) => (d.x - 8) + 'px')
						.style('top', (d) => (d.y * .5625 + chart.height/5 - 5) + 'px')
					//Draw line
					  link.attr('x1', (d) => d.source.x )
						.attr('y1', (d) => (d.source.y * .5625 + chart.height/5))
						.attr('x2', (d) => d.target.x)
						.attr('y2', (d) => (d.target.y * .5625 + chart.height/5))
				});
		force.start(); //Restart as needed  
		  });//End of JSON
})//End of DOM check
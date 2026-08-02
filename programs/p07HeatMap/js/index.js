"use strict";

//DIZAD completed 04/23/17
//JQuery UI imported
//JQuery imported
//D3 imported
//alert("[Description required]"); //Provide user instructions
$(document).ready(function () {
	//Start of DOM check function
	//Data variables
	var dataURL = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json"; //Api data location
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var colors = ["#5e4fa2", "#3288bd", "#66c2a5", "#abdda4", "#e6f598", "#ffffbf", "#fee08b", "#fdae61", "#f46d43", "#d53e4f", "#9e0142"];
	//var colors = ["#5541af", "#1b8dd4", "#57d1aa", "#a3e69a", "#ecff8e", "#ffffbf", "#ffe08a", "#ffae5f", "#ff6738", "#ee253c", "#9f0042"];

	//Chart variables
	var chartMargin = {
		top: 100,
		bottom: 100,
		left: 100,
		right: 100
	};
	var chartWidth = $(".chart").width();
	var chartHeight = $(".chart").height();
	var effectiveHeight = chartHeight - chartMargin.bottom - chartMargin.top;
	var effectiveWidth = chartWidth - chartMargin.left - chartMargin.right;
	var circleDefaultRadius = 10;
	var scaleY = 5;

	//GetJSON Operation
	$.getJSON(dataURL, function (dataEntry) {
		//Start of JSON
		//Variables
		//Data variables
		var baseTemperature = dataEntry.baseTemperature;
		var temperatureData = dataEntry.monthlyVariance;

		//Year range
		var yearDataMap = temperatureData.map(function (d) {
			return d.year;
		});
		var yearMin = d3.min(yearDataMap); //1753
		var yearMax = d3.max(yearDataMap); //2015

		//Bucket variables
		var bucketWidth = effectiveWidth / (yearMax - yearMin);
		var bucketHeight = effectiveHeight / months.length;

		//Create the D3Master - attaching the svg
		var d3Master = d3.select(".d3Content").append('svg').attr('width', chartWidth).attr('height', chartHeight);
		//Create the D3selectAll - attaching the data
		var d3SelectAll = d3Master.selectAll().data(temperatureData).enter()
		//Create the rectangles on the selectAll(Works best when connected to this)
		.append("rect").attr("fill", function (d, i) {
			return colors[Math.round(baseTemperature + d.variance - 2)];
		}).attr("x", function (d, i) {
			return chartMargin.left + (d.year - yearMin) * bucketWidth;
		}).attr("y", function (d, i) {
			return chartMargin.top + d.month * bucketHeight - bucketHeight;
		}).attr("width", bucketWidth).attr("height", bucketHeight);

		//Labels
		//Title
		d3Master.append('text').attr('x', chartWidth / 2 - 250).attr('y', 50).attr('id', 'fontChartTitle').text('Monthly Global Surface Temperature');

		//SubTitle
		d3Master.append('text').attr('x', chartWidth / 2 - 100).attr('y', 75).attr('id', 'fontChartTitle').style('font-size', 20).text('Year Range (1753 - 2015)');

		//SubTitle
		d3Master.append('text').attr('x', 145).attr('y', 90).attr('id', 'fontChartTitle').style('font-size', 15).text('Temperatures are in Celsius and reported as anomalies relative to the Jan 1951-Dec 1980 average. Estimated Jan 1951-Dec 1980 \n absolute temperature &#8451: 8.66 +/- 0.07');

		//Reference footnote
		d3Master.append('text').attr('x', chartWidth - 550) //Keep in mind that this is rotated, so coords work different
		.attr('y', chartHeight - 15).attr('id', 'fontChartFootNote').text('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json');

		//Add y-label "Gross Domestic Product"
		d3Master.append('text').attr('transform', 'rotate(-90)').attr('x', -chartHeight / 2) //Keep in mind that this is rotated, so coords work different
		.attr('y', 40).attr('id', 'fontChartLabel').text('Months');

		//Add x-axis Label "Year"
		d3Master.append('text').attr('x', chartWidth / 2).attr('y', chartHeight - 40).attr('id', 'fontChartLabel').text('Years');

		var varianceDataMap = temperatureData.map(function (d) {
			return d.variance;
		});
		var varianceMin = d3.min(varianceDataMap);
		var varianceMax = d3.max(varianceDataMap);
		var temperatureMin = baseTemperature + varianceMin;
		var temperatureMax = baseTemperature + varianceMax;

		//Add legend
		var legendBucketWidth = 50;
		var legendBucketHeight = 25;
		var legendTopMargin = 30;
		var legendTickLength = 7;
		for (var i = 0; i < colors.length; i++) {
			//Add rectangles
			d3Master.append("rect").attr("fill", colors[i]).style("stroke-width", "1px").style("stroke", "black").attr("x", chartMargin.left + legendBucketWidth * i).attr("y", chartMargin.top + effectiveHeight + legendTopMargin).attr("width", legendBucketWidth).attr("height", legendBucketHeight);
			//Add temperatures
			d3Master.append("text").text(Math.round((temperatureMin + (temperatureMax - temperatureMin) / colors.length * (i + 1)) * 100) / 100).attr('x', chartMargin.left + legendBucketWidth * i + legendBucketWidth / 2 + 5).attr('y', chartMargin.top + effectiveHeight + 54 + 22);
			//Add ticks	
			d3Master.append("line").style("stroke-width", "1px").style("stroke", "black").attr("x1", chartMargin.left + (i + 1) * legendBucketWidth).attr("y1", chartMargin.top + effectiveHeight + legendBucketHeight + legendTopMargin).attr("x2", chartMargin.left + (i + 1) * legendBucketWidth).attr("y2", chartMargin.top + effectiveHeight + legendBucketHeight + legendTopMargin + legendTickLength);
		}

		//Scaling
		var colorScale = d3.scaleLinear().domain([baseTemperature + varianceMin, baseTemperature + varianceMax]).range([0, colors.length]);

		//Tooltip
		var d3ToolTip = d3.select(".d3Content").append("div").attr("class", "tooltip").style("opacity", 0);

		//Mouseover
		var mouseOver = d3SelectAll.on("mouseover", function (d) {
			d3.select(this).style("opacity", 1).transition().duration(100).attr("fill", "purple");
			//Tooltip mouseOver
			d3ToolTip.transition().duration(100).style("opacity", 1);

			//MouseOut
			var mouseOut = d3SelectAll.on("mouseout", function () {
				d3.select(this).transition().duration(250).attr("fill", function (d, i) {
					return colors[Math.round(baseTemperature + d.variance - 2)];
				});
				//Tooltip mouseOut
				d3ToolTip.transition().duration(500).style("opacity", 0);
			});
			d3ToolTip.html("<span><span id='fontBold'>Temp:  </span> " + Math.round((d.variance + baseTemperature) * 100) / 100 + "&#8451</span><br><span><span id='fontBold'>Year:  </span>" + d.year + "</span><br><span><span id='fontBold'>Month:  </span> " + months[d.month - 1] + "</span>").style("left", d3.event.pageX + 50 + "px").style("top", d3.event.pageY - 10 + "px");
		});

		//Add x-axis 
		var xAxisScale = d3.scaleLinear().domain([yearMin, yearMax]).range([0, effectiveWidth]);

		var xAxis = d3.axisBottom(xAxisScale).tickFormat(function (d, i) {
			return d;
		});

		var xAxisAppend = d3Master.append('g').call(xAxis).attr('transform', 'translate(' + chartMargin.left + ', ' + (effectiveHeight + chartMargin.top) + ')');

		//Add y-axis 
		var yAxisScale = d3.scaleLinear().domain([0, months.length]).range([0, effectiveHeight]);

		var yAxis = d3.axisLeft(yAxisScale).tickFormat(function (d, i) {
			return months[i];
		});

		var yAxisAppend = d3Master.append('g').call(yAxis).attr('transform', 'translate(' + chartMargin.left + ', ' + chartMargin.top + ')');
	}); //End of JSON
}); //End of DOM check function
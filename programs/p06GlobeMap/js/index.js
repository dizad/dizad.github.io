'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//DIZAD completed 04/29/17
//alert('This is a world map showing the meteorite landings over history.');

var MapClass = function (_React$Component) {
	_inherits(MapClass, _React$Component);

	function MapClass() {
		_classCallCheck(this, MapClass);

		return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	}

	//Start the react class
	//Build the componentDidMount to interact with the browser

	MapClass.prototype.componentDidMount = function componentDidMount() {
		//Define chart variables
		var chartWidth = window.innerWidth; //Set the width of the screen
		var chartHeight = window.innerHeight; //Set the height of the screen

		//Attach the div tag
		var div = d3.select('.mapdata').append('div').attr('class', 'tooltip');

		//Attach the svg
		var svg = d3.select('.mapdata').append("div").append('svg').attr("preserveAspectRatio", "xMinYMin meet").attr("viewBox", "0 0 " + chartWidth + " " + chartHeight).call(d3.zoom().on("zoom", function () {
			svg.attr("transform", d3.event.transform);
		})).append('g');

		//Define the d3 style, will use geoMercator i.e. flat 2d layout of the map
		//Create the projection
		var projection = d3.geoMercator().scale(220).translate([chartWidth / 2, chartHeight / 2]);

		//Create the path
		var path = d3.geoPath().projection(projection);

		//Draw the map
		var mapURL = "https://d3js.org/world-50m.v1.json";
		$.getJSON(mapURL, function (data) {
			svg.append('g').selectAll('path') //Draw a fill-based path
			.data(topojson.feature(data, data.objects.countries).features).enter().append('path').attr('fill', 'white') //Fill color
			.attr('stroke', '#8199A1') //Outline color
			.attr('d', path);

			//Draw the meteorites
			var meteoriteURL = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json";
			$.getJSON(meteoriteURL, function (data) {
				var meteoriteData = data.features;

				meteoriteData.sort(function (a, b) {
					return b.properties.mass - a.properties.mass;
				});
				//Define the colors of the dots
				var hueScale = d3.scaleLinear().domain([0, 5000000]).range([0, 5000000]).clamp(true);

				//Define the scale of the dots				
				var scale = d3.scaleLinear().domain([0, 5000000]).range([3, 50]).clamp(true);

				var isMouseOver = false;
				var range = 18000;
				//Attach the circles
				svg.append('g').selectAll('circle').data(meteoriteData).enter().append('circle').attr('cx', function (d) {
					return projection([d.properties.reclong, d.properties.reclat])[0];
				}).attr('cy', function (d) {
					return projection([d.properties.reclong, d.properties.reclat])[1];
				}).attr('r', function (d) {
					return d.properties.mass ? scale(parseInt(d.properties.mass)) : scale(0);
				}).attr('fill', function (d) {
					return 'hsl(' + hueScale(parseInt(d.properties.mass)) + ',100%, 50%)';
				}).style('fill-opacity', function (d) {
					return d.properties.mass <= range ? 1 : 0.5;
				}).attr('stroke-width', 1).attr('stroke', '#525252')

				//Mouseover
				//Select the data point
				.on('mouseover', function (d) {
					//General variables
					isMouseOver = true;
					d3.select(this)
					//Change the size of the dots
					.attr('r', function (d) {
						return d.properties.mass ? scale(parseInt(d.properties.mass)) * 2.0 : scale(0) * 2.0;
					});
					//Tooltip
					var latitude = d.properties.reclat;
					var longitude = d.properties.reclong;
					var tooltipURL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true';
					var tooltipOffsetX = d3.event.pageX + 32 + 'px';
					var tooltipOffsetY = d3.event.pageY - 90 + 'px';

					d3.json(tooltipURL, function (data) {
						if (isMouseOver == false) {
							return null;
						}
						var location = data.results[0] ? data.results[0].formatted_address : 'latitude: ' + latitude + ', longitude: ' + longitude;
						div.html('<span style = "font-size: 20px; text-decoration: underline;" id = "fontBold">Meteorite Info:</span><br>' + '<strong>Name:</strong> ' + d.properties.name + '<br><strong>Class:</strong> ' + d.properties.recclass + '<br><strong>Mass(g):</strong> ' + (d.properties.mass ? d.properties.mass : 'unknown') + '<br><strong>Year:</strong> ' + d.properties.year.slice(0, 4) + '<br><strong>Location:</strong> ' + location).style('opacity', 0.9).style('left', tooltipOffsetX).style('top', tooltipOffsetY).style('position', 'absolute').style('display', 'block');
					}); //End of tooltip info API
				}) //End of mouseOver

				//Mouseout
				.on('mouseout', function (d) {
					isMouseOver = false;
					div.style('display', 'none');
					d3.select(this).attr('r', function (d) {
						return d.properties.mass ? scale(parseInt(d.properties.mass)) : scale(0);
					});
				}); //End of mouseOut        
			}); //End of meteorite API
		}); //End of drawMap API
	}; //End of componentDidMount

	MapClass.prototype.render = function render() {
		return React.createElement('div', { className: 'mapdata' });
	};

	return MapClass;
}(React.Component); //End of react class

//Render the DOM

ReactDOM.render(React.createElement(MapClass, null), document.getElementById('reactApp'));
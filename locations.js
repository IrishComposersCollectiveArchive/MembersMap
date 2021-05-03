// Much of this code was taken from @jamesthomson codepen https://codepen.io/jamesthomson 

var cities=[
  {"country":"England","city":"London","lat":51.5072, "lon":-0.1275, "ppl":4},
  {"country":"Germany","city":"Berlin","lat":52.52437, "lon":13.41053, "ppl":3},
	{"country":"Japan", "city":	"Tokyo", "lat":35.6895, "lon":139.69171, "ppl":1},
	{"country":"Malta", "city":	"Sliema", "lat":35.9125, "lon": 14.50222, "ppl":1},
	{"country":"Netherlands", "city":	"The Hague", "lat":52.07667, "lon":4.29861, "ppl":2},
	{"country":"Northern Ireland", "city":	"Antrim", "lat":54.66667, "lon":-6.25, "ppl":2},
	{"country":"Northern Ireland", "city":	"Armagh", "lat":54.35, "lon":-6.66667, "ppl":1},
	{"country":"Northern Ireland", "city":	"Down", "lat":54.33333, "lon":-5.66667, "ppl":1},
	{"country":"Republic of Ireland", "city":	"Carlow", "lat":52.66667, "lon":-6.83333, "ppl":1},
	{"country":"Republic of Ireland", "city":	"Dublin", "lat":53.33306, "lon":-6.24889, "ppl":26},
	{"country":"Republic of Ireland", "city":	"Kerry", "lat":52.16667, "lon":-9.75, "ppl":2},
	{"country":"Republic of Ireland", "city":	"Kildare", "lat":53.16667, "lon":-6.75, "ppl":1},
	{"country":"Republic of Ireland", "city":	"Limerick", "lat":52.66472, "lon":-8.62306, "ppl":1},
	{"country":"Republic of Ireland", "city":	"Westmeath", "lat":53.5, "lon":-7.5, "ppl":1},
	{"country":"Republic of Ireland", "city":	"Wicklow", "lat":53, "lon":-6.41667, "ppl":1},
	{"country":"Sweden",	"city":	"Stockholm", "lat":59.5, "lon": 18, "ppl":1},
	{"country":"Wales", "city":	"Swansea", "lat":51.58333, "lon":-4, "ppl":1}
];




var width = 800,
    height = 400;

var projection = d3.geo.mercator()
    .center([50, 10]) //long and lat starting position
    .scale(150) //starting zoom position
    .rotate([10,0]); //where world split occurs

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var path = d3.geo.path()
    .projection(projection);

var g = svg.append("g");
// load and display the world and locations
d3.json("https://gist.githubusercontent.com/d3noob/5193723/raw/world-110m2.json", function(error, topology) {

var world = g.selectAll("path")
				.data(topojson.object(topology, topology.objects.countries).geometries)
				.enter()
				.append("path")
				.attr("d", path)


// add city location circle
  var location = g.selectAll("circle")
			       .data(cities)
			       .enter()
			       .append("circle")
						 .attr("id", function(cities) {return cities.city;})
			       .attr("cx", function(cities) {return projection([cities.lon, cities.lat])[0];})
			       .attr("cy",  function(cities) {return projection([cities.lon, cities.lat])[1];})
			       //.attr("r", function(cities) {return (cities.ppl / 2);})
						 .attr("r", 2)
			       .style("fill", "#ff2e74")
			       .style("opacity", 0.8)
			       ;          
						
});


//zoom and pan functionality
var zoom = d3.behavior.zoom()
    .on("zoom",function() {
        g.attr("transform","translate("+ 
            d3.event.translate.join(",")+")scale("+d3.event.scale+")");
        g.selectAll("path")  
            .attr("d", path.projection(projection)); 
  });
svg.call(zoom);
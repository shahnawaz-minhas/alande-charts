
// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 50},
	width = 960 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

// parse the date / time
var parseTime = d3.timeParse("%d-%b-%y");
var formatTime = d3.timeFormat("%e %B");

// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// define the line
var valueline = d3.line()
				  .x(function(d) { return x(d.entry_date); })
				  .y(function(d) { return y(d.score); });

var div = d3.select("body").append("div")
			.attr("class", "tooltip")
			.style("opacity", 0);

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform",
				"translate(" + margin.left + "," + margin.top + ")");

// Get the data
let data = [
	{
		"score"     : 125,
		"entry_date": "2019-04-10"
	},
	{
		"score"     : 20,
		"entry_date": "2019-04-06"
	},
	{
		"score"     : 115,
		"entry_date": "2018-04-05"
	},
	{
		"score"     : 130,
		"entry_date": "2012-03-28"
	},
	{
		"score"     : 160,
		"entry_date": "2013-03-27"
	}, {
		"score"     : 125,
		"entry_date": "2015-04-10"
	},
	{
		"score"     : 20,
		"entry_date": "2014-04-06"
	},
	{
		"score"     : 115,
		"entry_date": "2014-04-05"
	},
	{
		"score"     : 130,
		"entry_date": "2012-03-28"
	},
	{
		"score"     : 160,
		"entry_date": "2118-03-27"
	}, {
		"score"     : 125,
		"entry_date": "2218-04-10"
	},
	{
		"score"     : 20,
		"entry_date": "2318-04-06"
	},
	{
		"score"     : 115,
		"entry_date": "2218-04-05"
	},
	{
		"score"     : 130,
		"entry_date": "2418-03-28"
	},
	{
		"score"     : 160,
		"entry_date": "2518-03-27"
	}, {
		"score"     : 125,
		"entry_date": "2618-04-10"
	},
	{
		"score"     : 20,
		"entry_date": "2718-04-06"
	},
	{
		"score"     : 115,
		"entry_date": "2818-04-05"
	},
	{
		"score"     : 130,
		"entry_date": "2918-03-28"
	},
	{
		"score"     : 160,
		"entry_date": "2218-03-27"
	}, {
		"score"     : 125,
		"entry_date": "2018-04-10"
	},
	{
		"score"     : 20,
		"entry_date": "2018-04-06"
	},
	{
		"score"     : 115,
		"entry_date": "2018-04-05"
	},
	{
		"score"     : 130,
		"entry_date": "2018-03-28"
	},
	{
		"score"     : 160,
		"entry_date": "2018-03-27"
	}, {
		"score"     : 125,
		"entry_date": "2018-04-10"
	},
	{
		"score"     : 20,
		"entry_date": "2018-04-06"
	},
	{
		"score"     : 115,
		"entry_date": "2018-04-05"
	},
	{
		"score"     : 130,
		"entry_date": "2018-03-28"
	},
	{
		"score"     : 160,
		"entry_date": "2018-03-27"
	}, {
		"score"     : 125,
		"entry_date": "2018-04-10"
	},
	{
		"score"     : 20,
		"entry_date": "2018-04-06"
	},
	{
		"score"     : 115,
		"entry_date": "2018-04-05"
	},
	{
		"score"     : 130,
		"entry_date": "2018-03-28"
	},
	{
		"score"     : 160,
		"entry_date": "2018-03-27"
	}, {
		"score"     : 125,
		"entry_date": "2018-04-10"
	},
	{
		"score"     : 20,
		"entry_date": "2018-04-06"
	},
	{
		"score"     : 115,
		"entry_date": "2018-04-05"
	},
	{
		"score"     : 130,
		"entry_date": "2018-03-28"
	},
	{
		"score"     : 160,
		"entry_date": "2018-03-27"
	}, {
		"score"     : 125,
		"entry_date": "2018-04-10"
	},
	{
		"score"     : 20,
		"entry_date": "2018-04-06"
	},
	{
		"score"     : 115,
		"entry_date": "2018-04-05"
	},
	{
		"score"     : 130,
		"entry_date": "2018-03-28"
	},
	{
		"score"     : 160,
		"entry_date": "2018-03-27"
	}, {
		"score"     : 125,
		"entry_date": "2018-04-10"
	},
	{
		"score"     : 20,
		"entry_date": "2018-04-06"
	},
	{
		"score"     : 115,
		"entry_date": "2018-04-05"
	},
	{
		"score"     : 130,
		"entry_date": "2018-03-28"
	},
	{
		"score"     : 160,
		"entry_date": "2018-03-27"
	}, {
		"score"     : 125,
		"entry_date": "2018-04-10"
	},
	{
		"score"     : 20,
		"entry_date": "2018-04-06"
	},
	{
		"score"     : 115,
		"entry_date": "2018-04-05"
	},
	{
		"score"     : 130,
		"entry_date": "2018-03-28"
	},
	{
		"score"     : 160,
		"entry_date": "2018-03-27"
	}, {
		"score"     : 125,
		"entry_date": "2018-04-10"
	},
	{
		"score"     : 20,
		"entry_date": "2018-04-06"
	},
	{
		"score"     : 115,
		"entry_date": "2018-04-05"
	},
	{
		"score"     : 130,
		"entry_date": "2018-03-28"
	},
	{
		"score"     : 160,
		"entry_date": "2018-03-27"
	}, {
		"score"     : 125,
		"entry_date": "2018-04-10"
	},
	{
		"score"     : 20,
		"entry_date": "2018-04-06"
	},
	{
		"score"     : 115,
		"entry_date": "2018-04-05"
	},
	{
		"score"     : 130,
		"entry_date": "2019-03-28"
	},
	{
		"score"     : 160,
		"entry_date": "2019-03-27"
	}
];
	
	// format the data
	data.forEach(function(d) {
		d.entry_date = parseTime(d.entry_date);
		d.score = +d.score;
	});
	
	// scale the range of the data
	x.domain(d3.extent(data, function(d) { return d.entry_date; }));
	y.domain([0, d3.max(data, function(d) { return d.score; })]);
	
	// add the valueline path.
	svg.append("path")
	   .data([data])
	   .attr("class", "line")
	   .attr("d", valueline);
	
	// add the dots with tooltips
	svg.selectAll("dot")
	   .data(data)
	   .enter().append("circle")
	   .attr("r", 5)
	   .attr("cx", function(d) { return x(d.entry_date); })
	   .attr("cy", function(d) { return y(d.score); })
	   .on("mouseover", function(d) {
		   div.transition()
			  .duration(200)
			  .style("opacity", .9);
		   div.html(formatTime(d.entry_date) + "<br/>" + d.score)
			  .style("left", (d3.event.pageX) + "px")
			  .style("top", (d3.event.pageY - 28) + "px");
	   })
	   .on("mouseout", function(d) {
		   div.transition()
			  .duration(500)
			  .style("opacity  ", 0);
	   });
	
	// add the X Axis
	svg.append("g")
	   .attr("transform", "translate(0," + height + ")")
	   .call(d3.axisBottom(x));
	
	// add the Y Axis
	svg.append("g")
	   .call(d3.axisLeft(y));
	

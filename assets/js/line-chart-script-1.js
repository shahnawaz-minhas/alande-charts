//////////////////////////////////////////////
// Data //////////////////////////////////////
//////////////////////////////////////////////
// fake data
var data = [
	{year: 1, population: 1192},
	{year: 2, population: 1234},
	{year: 3, population: 1463},
	{year: 4, population: 1537},
	{year: 5, population: 1334},
	{year: 6, population: 1134},
	{year: 7, population: 1234},
	{year: 8, population: 1484},
	{year: 9, population: 1562},
	{year: 10, population: 1427},
	{year: 11, population: 1325},
	{year: 12, population: 1484},
	{year: 13, population: 1661},
	{year: 14, population: 1537},
	{year: 15, population: 1334},
	{year: 16, population: 1134},
	{year: 17, population: 1427},
	{year: 18, population: 1192},
	{year: 19, population: 1234},
	{year: 20, population: 1463},
	{year: 21, population: 1537},
	{year: 22, population: 1334},
	{year: 23, population: 1134},
	{year: 24, population: 1234},
	{year: 25, population: 1484},
	{year: 26, population: 1562},
	{year: 27, population: 1427},
	{year: 28, population: 1325},
	{year: 29, population: 1484},
	{year: 30, population: 1661},
	{year: 31, population: 1537},
	{year: 32, population: 1334},
	{year: 33, population: 1134},
	{year: 34, population: 1427},
	{year: 35, population: 1134},
	{year: 36, population: 1427},
	{year: 37, population: 1192},
	{year: 38, population: 1234},
	{year: 39, population: 1463},
	{year: 40, population: 1537},
	{year: 41, population: 1334},
	{year: 42, population: 1134},
	{year: 43, population: 1234},
	{year: 44, population: 1484},
	{year: 45, population: 1562},
	{year: 46, population: 1427},
	{year: 47, population: 1325},
	{year: 48, population: 1484},
	{year: 49, population: 1661},
	{year: 50, population: 1537},
	{year: 51, population: 1334},
	{year: 52, population: 1134},
	{year: 53, population: 1427}
];


// force types
function type( dataArray ) {
	dataArray.forEach(function ( d ) {
		d.year      = d.year;
		d.retention = +d.population;
	});
	return dataArray;
}

data = type(data);

//////////////////////////////////////////////
// Chart Config /////////////////////////////
//////////////////////////////////////////////

// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 20, bottom: 30, left: 50},
	width, // width gets defined below
	height = 250 - margin.top - margin.bottom;

// Set the scales ranges
var xScale = d3.scaleLinear().range(0, width);
var yScale = d3.scaleLinear().range([ height, 0 ]);

// Define the axes
var xAxis = d3.axisBottom().scale(xScale);
var yAxis = d3.axisLeft().scale(yScale);

// create a line
var line = d3.line();

// Add the svg canvas
var svg = d3.select("body")
			.append("svg")
			.attr("height", height + margin.top + margin.bottom);

var artboard = svg.append("g")
				  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// set the domain range from the data
xScale.domain(d3.extent(data, function ( d ) {
	return d.year;
}));
yScale.domain([
	d3.min(data, function ( d ) { return Math.floor(d.population - 200); }),
	d3.max(data, function ( d ) { return Math.floor(d.population + 200); })
]);

// draw the line created above
var path = artboard.append("path").data([ data ])
				   .style('fill', 'none')
				   .style('stroke', 'steelblue')
				   .style('stroke-width', '2px');

// Add the X Axis
var xAxisEl = artboard.append("g")
					  .attr("transform", "translate(0," + height + ")")
					  .call(xAxis)
					  .style("text-anchor", "end")
					  .attr("dx", "-.8em")
					  .attr("dy", ".15em");

// Add the Y Axis
// we aren't resizing height in this demo so the yAxis stays static, we don't need to call this every resize
var yAxisEl = artboard.append("g")
					  .call(yAxis);

//////////////////////////////////////////////
// Drawing ///////////////////////////////////
//////////////////////////////////////////////
function drawChart() {
	// reset the width
	width = parseInt(d3.select('body').style('width'), 10) - margin.left - margin.right;
	
	// set the svg dimensions
	svg.attr("width", width + margin.left + margin.right);
	
	// Set new range for xScale
	xScale.range([ 0, width ]);
	
	// give the x axis the resized scale
	xAxis.scale(xScale);
	
	// draw the new xAxis
	xAxisEl.call(xAxis);
	
	// specify new properties for the line
	line.x(function ( d ) { return xScale(d.year); })
		.y(function ( d ) { return yScale(d.population); });
	
	// draw the path based on the line created above
	path.attr('d', line);
}

// call this once to draw the chart initially
drawChart();


//////////////////////////////////////////////
// Resizing //////////////////////////////////
//////////////////////////////////////////////

// redraw chart on resize
window.addEventListener('resize', drawChart);
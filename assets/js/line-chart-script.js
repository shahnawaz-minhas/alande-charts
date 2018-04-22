let data = [
	{year: 2000, score: 1192},
	{year: 2001, score: 1234},
	{year: 2002, score: 1463},
	{year: 2003, score: 1537},
	{year: 2004, score: 1334},
	{year: 2005, score: 1134},
	{year: 2006, score: 1234},
	{year: 2007, score: 1484},
	{year: 2008, score: 1562},
	{year: 2009, score: 1427},
	{year: 2010, score: 1325},
	{year: 2011, score: 1484},
	{year: 2012, score: 1671},
	{year: 2013, score: 1587},
	{year: 2014, score: 1394},
	{year: 2015, score: 1124},
	{year: 2016, score: 14437},
	{year: 2017, score: 1437},
	{year: 2018, score: 14347},
	{year: 2019, score: 14567},
	{year: 2020, score: 14567},
	{year: 2021, score: 1527},
	{year: 2022, score: 1727},
	{year: 2023, score: 1927},
	{year: 2024, score: 1127},
	{year: 2025, score: 1227},
	{year: 2026, score: 1827},
	{year: 2027, score: 1927},
	{year: 2028, score: 1027},
	{year: 2029, score: 1927},
	{year: 2030, score: 1437},
	{year: 2031, score: 1437},
	{year: 2032, score: 14207},
	{year: 2033, score: 1421},
	{year: 2034, score: 1422},
	{year: 2035, score: 1423},
	{year: 2036, score: 1424},
	{year: 2037, score: 1425},
	{year: 2038, score: 1426},
	{year: 2039, score: 2427},
	{year: 2040, score: 2427},
	{year: 2041, score: 2427},
	{year: 2042, score: 2427},
	{year: 2043, score: 2427},
	{year: 2044, score: 3427},
	{year: 2045, score: 4427},
	{year: 2046, score: 5427},
	{year: 2047, score: 6427},
	{year: 2048, score: 7427},
	{year: 2049, score: 8427},
	{year: 2050, score: 9427},
	{year: 2051, score: 7427},
	{year: 2052, score: 1127},
	{year: 2053, score: 1227}
];

//Parse date & time
let parseDate = d3.timeParse("%Y");

// force types
function type(dataArray) {
	dataArray.forEach(function(d) {
		d.year = parseDate(d.year);
		d.retention = +d.score;
	});
	return dataArray;
}
data = type(data);

// Set the dimensions of the canvas / graph
let margin = {top: 30, right: 20, bottom: 30, left: 50},
	width, // width gets defined below
	height = 250 - margin.top - margin.bottom;

// Set the scales ranges
let xScale = d3.scaleTime(),
	yScale = d3.scaleLinear().range([height, 0]);

// Define the axes
let xAxis = d3.axisBottom().scale(xScale),
	yAxis = d3.axisLeft().scale(yScale);

// create a line
let line = d3.line();

// Add the svg canvas
let svg = d3.select("body")
			.append("svg")
			.attr("height", height + margin.top + margin.bottom);

let artboard = svg.append("g")
				  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// set the domain range from the data
xScale.domain(d3.extent(data, function(d) { return d.year; }));
yScale.domain([
	d3.min(data, function(d) { return Math.floor(d.score - 200); }),
	d3.max(data, function(d) { return Math.floor(d.score + 200); })
]);

// draw the line created above
let path = artboard.append("path").data([data])
				   .style('fill', 'none')
				   .style('stroke', 'steelblue')
				   .style('stroke-width', '2px');

// Add the X Axis
var xAxisEl = artboard.append("g")
					  .attr("transform", "translate(0," + height + ")");

// Add the Y Axis
// we aren't resizing height in this demo so the yAxis stays static, we don't need to call this every resize
let yAxisEl = artboard.append("g")
					  .call(yAxis);

//////////////////////////////////////////////
// Drawing ///////////////////////////////////
//////////////////////////////////////////////
function drawChart() {
	// reset the width
	width = parseInt(d3.select('.chart').style('width'), 10) - margin.left - margin.right;
	
	// set the svg dimensions
	svg.attr("width", width + margin.left + margin.right);
	
	// Set new range for xScale
	xScale.range([0, width]);
	
	// give the x axis the resized scale
	xAxis.scale(xScale);
	
	// draw the new xAxis
	xAxisEl.call(xAxis);
	
	// specify new properties for the line
	line.x(function(d) { return xScale(d.year); })
		.y(function(d) { return yScale(d.score); });
	
	// draw the path based on the line created above
	path.attr('d', line);
}

// call this once to draw the chart initially
drawChart();

// redraw chart on resize
window.addEventListener('resize', drawChart);
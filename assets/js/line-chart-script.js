var data1 = [
	{
		date : '2006-02-22',
		value: 950
	},
	{
		date : '2006-08-22',
		value: 1000
	},
	{
		date : '2007-01-11',
		value: 700
	},
	{
		date : '2008-10-01',
		value: 534
	},
	{
		date : '2009-02-24',
		value: 1423
	},
	{
		date : '2010-12-30',
		value: 1222
	},
	{
		date : '2011-05-15',
		value: 948
	},
	{
		date : '2012-04-02',
		value: 1938
	},
	{
		date : '2013-08-19',
		value: 1245
	},
	{
		date : '2013-11-11',
		value: 888
	},
	{
		date : '2005-02-22',
		value: 950
	},
	{
		date : '2006-08-22',
		value: 1000
	},
	{
		date : '2007-01-11',
		value: 700
	},
	{
		date : '2008-10-01',
		value: 534
	},
	{
		date : '2009-02-24',
		value: 1423
	},
	{
		date : '2010-12-30',
		value: 1222
	},
	{
		date : '2011-05-15',
		value: 948
	},
	{
		date : '2012-04-02',
		value: 1938
	},
	{
		date : '2013-08-19',
		value: 1245
	},
	{
		date : '2015-11-11',
		value: 2000
	},
	{
		date : '2016-03-16',
		value: 4500
	},
	{
		date : '2016-01-16',
		value: 4500
	},
	{
		date : '2016-02-16',
		value: 4501
	},
	{
		date : '2016-03-16',
		value: 4502
	},
	{
		date : '2016-04-16',
		value: 4503
	},
	{
		date : '2016-05-16',
		value: 4504
	},
	{
		date : '2016-06-16',
		value: 4600
	},
	{
		date : '2016-07-16',
		value: 4700
	},
	{
		date : '2016-08-16',
		value: 4800
	},
	{
		date : '2016-09-16',
		value: 4900
	},
	{
		date : '2016-10-16',
		value: 5000
	},
	{
		date : '2016-11-16',
		value: 5100
	},
	{
		date : '2016-12-16',
		value: 5200
	},
	{
		date : '2017-01-16',
		value: 5300
	},
	{
		date : '2017-02-16',
		value: 5400
	},
	{
		date : '2017-03-16',
		value: 5500
	},
	{
		date : '2017-04-16',
		value: 5600
	},
	{
		date : '2017-05-16',
		value: 5700
	},
	{
		date : '2017-06-16',
		value: 5800
	},
	{
		date : '2017-07-16',
		value: 5900
	},
	{
		date : '2017-08-16',
		value: 6000
	},
	{
		date : '2017-09-16',
		value: 6100
	},
	{
		date : '2017-10-16',
		value: 6200
	},
	{
		date : '2017-11-16',
		value: 6300
	},
	{
		date : '2017-12-16',
		value: 6400
	},
	{
		date : '2018-01-16',
		value: 6500
	},
	{
		date : '2018-02-16',
		value: 6600
	},
	{
		date : '2018-03-16',
		value: 6700
	},
	{
		date : '2018-04-16',
		value: 6800
	},
	{
		date : '2018-05-16',
		value: 6900
	}
];


$(document).ready(function () {
	init();
	render();
	updateData(data1);
	/*d3.select('#toggleData').on('click', function () {
		if ( currentData == 'data1' ) {
			updateData(data2);
			currentData = 'data2';
		}
		else if ( currentData == 'data2' ) {
			updateData(data1);
			currentData = 'data1';
		}
	});*/
	
	d3.select(window).on('resize', function () {
		resize();
	});
});

let chartContainer,
	svg,
	marginContainer,
	x,
	y,
	xAxis,
	yAxis,
	width,
	height,
	line,
	area,
	startData,
	currentData = 'data1';

let margin   = {top: 20, right: 30, bottom: 30, left: 40},
	maxWidth = 800 - margin.left - margin.right;

let detailWidth  = 150,
	detailHeight = 75,
	detailMargin = 15;

function init() {
	chartContainer  = d3.select('.chart-container');
	svg             = chartContainer.append('svg');
	marginContainer = svg.append('g').attr('class', 'margin-container');
}

function render() {
	let data = eval(currentData),
		parse = d3.time.format('%Y-%m-%d').parse;
	
	data = data.map(function ( datum ) {
		if ( typeof datum.date == 'string' ) {
			datum.date = parse(datum.date);
		}
		
		return datum;
	});
	
	getDimensions();
	
	svg.attr("width", width + margin.left + margin.right)
	   .attr("height", height + margin.top + margin.bottom);
	
	marginContainer
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
	x = d3.time.scale().range([ 0, width ]);
	y = d3.scale.linear().range([ height, 0 ]);
	x.domain(d3.extent(data, function ( d ) { return d.date; }));
	y.domain([ 0, d3.max(data, function ( d ) { return d.value; }) * 1.25 ]);
	
	area = d3.svg.area()
			 .x(function ( d ) { return x(d.date); })
			 .y0(height)
			 .y1(function ( d ) { return y(d.value); });
	
	line = d3.svg.area()
			 .x(function ( d ) { return x(d.date); })
			 .y(function ( d ) { return y(d.value); });
	
	startData = data.map(function ( datum ) {
		return {
			date : datum.date,
			value: 0
		};
	});
	
	xAxis = d3.svg.axis()
			  .scale(x)
			  .orient('bottom');
	
	yAxis = d3.svg.axis()
			  .scale(y)
			  .orient('left');
	
	marginContainer.append('g')
				   .attr('class', 'x axis')
				   .attr('transform', 'translate(0,' + height + ')')
				   .call(xAxis)
				   .selectAll("text")
				   .style("text-anchor", "end")
				   .attr("dx", "-.8em")
				   .attr("dy", ".15em")
				   .attr("transform", "rotate(-65)" );
	
	marginContainer.append('g')
				   .attr('class', 'y axis')
				   .call(yAxis)
				   .append('text')
				   .attr('transform', 'rotate(-90)')
				   .attr('y', '1.5em')
				   .style('text-anchor', 'end')
				   .text('Price ($)');
	
	marginContainer.append('path')
				   .datum(startData)
				   .attr('class', 'line')
				   .attr('d', line)
				   .transition()
				   .duration(500)
				   .ease('quad')
				   .attrTween('d', function () {
					   var interpolator = d3.interpolateArray(startData, data);
		
					   return function ( t ) {
						   return line(interpolator(t));
					   }
				   })
				   .each('end', function () {
					   drawCircles(data, marginContainer);
				   });
	
	marginContainer.append('path')
				   .datum(startData)
				   .attr('class', 'area')
				   .attr('d', area)
				   .transition()
				   .duration(500)
				   .ease('quad')
				   .attrTween('d', function () {
					   var interpolator = d3.interpolateArray(startData, data);
		
					   return function ( t ) {
						   return area(interpolator(t));
					   }
				   });
}
let dataObj = {};
function drawCircle( datum, index ) {
	circleContainer.datum(datum)
				   .append('circle')
				   .attr('class', 'circle')
				   .attr('r', 0)
				   .style("fill", function(d) {            // <== Add these
					   dataObj = _.max(data1, function ( d ) { return d.value; });
					   if ( dataObj && dataObj.value == d.value ) {
						   return "green"
					   }
				   })
				   .attr(
					   'cx',
					   function ( d ) {
						   return x(d.date);
					   }
				   )
				   .attr(
					   'cy',
					   function ( d ) {
						   return y(d.value);
					   }
				   )
				   .on('mouseenter', function ( d ) {
					   d3.select(this)
						 .attr(
							 'class',
							 'circle active'
						 )
						 .attr('r', 7);
		
					   d.active = true;
		
					   showCircleDetail(d);
				   })
				   .on('mouseout', function ( d ) {
					   d3.select(this)
						 .attr(
							 'class',
							 'circle'
						 )
						 .attr('r', 6);
		
					   if ( d.active ) {
						   hideCircleDetails();
			
						   d.active = false;
					   }
				   })
				   .on('click touch', function ( d ) {
					   if ( d.active ) {
						   showCircleDetail(d)
					   } else {
						   hideCircleDetails();
					   }
				   })
				   .transition()
				   .delay(100 * index)
				   .duration(750)
				   .ease('elastic', 1.5, .75)
				   .attr('r', 6);
}

function drawCircles( data, container ) {
	circleContainer = container.append('g').attr('class', 'circles');
	data.forEach(function ( datum, index ) {
		drawCircle(datum, index);
	});
}

function hideCircleDetails() {
	circleContainer.selectAll('.bubble')
				   .remove();
}

function showCircleDetail( data ) {
	var details = circleContainer.append('g')
								 .attr('class', 'bubble')
								 .attr(
									 'transform',
									 function () {
										 var result = 'translate(';
			
										 var xVal = x(data.date) - detailWidth / 2;
										 if ( xVal + detailWidth > width ) {
											 xVal = width - detailWidth;
										 }
										 else if ( xVal < 0 ) {
											 xVal = 0;
										 }
			
										 result += xVal;
										 result += ', ';
										 result += y(data.value) - detailHeight - detailMargin;
										 result += ')';
			
										 return result;
									 }
								 );
	
	details.append('rect')
		   .attr('width', detailWidth)
		   .attr('height', detailHeight)
		   .attr('rx', 5)
		   .attr('ry', 5);
	
	let text = details.append('text')
					  .attr('class', 'text'),
		dateFormat = d3.time.format("%m/%d/%Y");
	
	text.append('tspan')
		.attr('class', 'price')
		.attr('x', detailWidth / 2)
		.attr('y', detailHeight / 3)
		.attr('text-anchor', 'middle')
		.text('Price: ' + data.value);
	
	text.append('tspan')
		.attr('class', 'date')
		.attr('x', detailWidth / 2)
		.attr('y', detailHeight / 4 * 3)
		.attr('text-anchor', 'middle')
		.text('Date: ' + dateFormat(data.date));
}

function updateData( data ) {
	
	var parse = d3.time.format('%Y-%m-%d').parse;
	
	data = data.map(function ( datum ) {
		if ( typeof datum.date == 'string' ) {
			datum.date = parse(datum.date);
		}
		return datum;
	});
	
	getDimensions();
	
	svg.attr("width", width + margin.left + margin.right)
	   .attr("height", height + margin.top + margin.bottom);
	
	marginContainer
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
	x = d3.time.scale().range([ 0, width ]);
	y = d3.scale.linear().range([ height, 0 ]);
	x.domain(d3.extent(data, function ( d ) { return d.date; }));
	y.domain([ 0, d3.max(data, function ( d ) { return d.value; }) * 1.25 ]);
	
	xAxis = d3.svg.axis()
			  .scale(x)
			  .orient('bottom');
	
	yAxis = d3.svg.axis()
			  .scale(y)
			  .orient('left');
	
	area = d3.svg.area()
			 .x(function ( d ) { return x(d.date); })
			 .y0(height)
			 .y1(function ( d ) { return y(d.value); });
	
	line = d3.svg.area()
			 .x(function ( d ) { return x(d.date); })
			 .y(function ( d ) { return y(d.value); });
	
	startData = data.map(function ( datum ) {
		return {
			date : datum.date,
			value: 0
		};
	});
	
	marginContainer.select('.x.axis')
				   .transition()
				   .attr('transform', 'translate(0,' + height + ')')
				   .call(xAxis);
	
	marginContainer.select('.y.axis')
				   .transition()
				   .call(yAxis);
	
	marginContainer.select('.circles').remove();
	
	marginContainer.select('.line')
				   .transition()
				   .duration(500)
				   .ease('quad')
				   .attrTween('d', function () {
					   var interpolator = d3.interpolateArray(startData, data);
		
					   return function ( t ) {
						   return line(interpolator(t));
					   }
				   })
				   .each('end', function () {
					   drawCircles(data, marginContainer);
				   });
	
	marginContainer.select('.area')
				   .transition()
				   .duration(500)
				   .ease('quad')
				   .attrTween('d', function () {
					   var interpolator = d3.interpolateArray(startData, data);
		
					   return function ( t ) {
						   return area(interpolator(t));
					   }
				   });
}

function getDimensions() {
	let containerWidth = parseInt(d3.select('.chart-container').style('width'));
	margin.top         = 20;
	margin.right       = 30;
	margin.left        = 40;
	margin.bottom      = 30;
	
	width = containerWidth - margin.left - margin.right;
	if ( width > maxWidth ) {
		width = maxWidth;
	}
	height = .75 * width;
}

function resize() {
	updateData(eval(currentData));
}
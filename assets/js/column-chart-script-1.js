let drawChart = function() {
    //d3.select("svg").remove();
    $(".chart").html("");
    $('.chart g').remove();
    $('.chart path').remove();
	let windowSize = {width: $(window).width(), height: $(window).height()},
		margin     = {top: 40, right: 20, bottom: 100, left: 70},
		width      = ( windowSize.width - ( ( 10 * windowSize.width ) / 100 ) ) - margin.left - margin.right,
		height     = ( windowSize.height - ( ( 10 * windowSize.height ) / 100 ) ) - margin.top - margin.bottom;

	let data = [
		{
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
		}
	];
	data.sort(function(a,b){
		return new Date(a.entry_date) - new Date(b.entry_date);
	});

	console.log(data);

	let x = d3.scale.ordinal().rangeRoundBands([ 0, width ], .1),
		y = d3.scale.linear().range([ height, 0 ]),
		xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(10),
		yAxis = d3.svg.axis().scale(y).orient("left").ticks(10, ""),
		tip = d3.tip().attr('class', 'd3-tip').offset([ -10, 0 ])
				.html(function ( d ) {
					return ( "<strong>score:</strong><span style='color:red'>" + d.score + "</span>" );
				});

	let svg = d3.select(".chart").append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	svg.call(tip);

	x.domain(data.map(function ( d ) { return d.entry_date; }));
	y.domain([ 0, d3.max(data, function ( d ) { return d.score; }) ]);

	svg.append("g")
	   .attr("class", "x axis")
	   .attr("transform", "translate(0," + height + ")")
	   .call(xAxis)
	   .selectAll("text")
	   .style("text-anchor", "end")
	   .attr("dx", "-.8em")
	   .attr("dy", ".15em")
	   .attr("transform", "rotate(-65)");

	svg.append("g")
	   .attr("class", "y axis")
	   .call(yAxis)
	   .append("text")
	   .attr("transform", "rotate(-90)")
	   .attr("y", 6)
	   .attr("dy", ".71em")
	   .style("text-anchor", "end")
	   .text("Scores");

	let dataObj = {};
	svg.selectAll(".bar")
	   .data(data)
	   .enter().append("rect")
	   .attr("class", "bar")
	   .style("fill", function ( d ) {
		   dataObj = _.max(data, function ( d ) { return d.score; });
		   if ( dataObj && dataObj.score == d.score ) {
			   return "green"
		   }
	   })
	   .attr("x", function ( d ) { return x(d.entry_date); })
	   .attr("width", x.rangeBand())
	   .attr("y", function ( d ) { return y(d.score); })
	   .attr("height", function ( d ) { return height - y(d.score); })
	   .on('mouseover', tip.show)
	   .on('mouseout', tip.hide);


	function type( d ) {
		d.score = +d.score;
		return d;
	}
};

$(document).ready(function () {

    drawChart();
    d3.select(window).on('resize', function () {
        drawChart();
    });
});

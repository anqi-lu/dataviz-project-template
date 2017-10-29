
export default function (svg_location, props) {
    console.log('in line!');
    const { 
        years,
        margin
      } = props;

    const data = years;
    const svg = d3.select("#lineSVG");
    const width = svg.attr('width');
    const height = svg.attr('height');
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const x = d3.scaleLinear()
    .rangeRound([0, width]);
    const y = d3.scaleLinear()
    .rangeRound([innerHeight, 0]);
    var line = d3.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.freq); });
    
    const xLabel = d => d.year; 
    const yLabel = d => d.freq;
    
    const g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    const xAxisGEnter = g.append('g').attr('class', 'x-axis');
    const xAxisG = xAxisGEnter
      .merge(g.select('.x-axis'))
        .attr('transform', `translate(0, ${innerHeight})`);
  

    renderChart(data);

    function renderChart(data) {
        x.domain(d3.extent(data, function(d) { return d.year; }));
        y.domain(d3.extent(data, function(d) { return d.freq; }));
/*
        xAxisGEnter
        .append('text')
            .attr('class', 'axis-label')
            .attr('y', 100)
        .merge(xAxisG.select('.axis-label'))
            .attr('x', innerWidth / 2)
            .text(xLabel);
       */
      g.append('g')
                 .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x))
              .select(".domain")
                .remove();
      
        g.append("g")
            .call(d3.axisLeft(y))
          .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Frequency");
      
        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line);
    }
}
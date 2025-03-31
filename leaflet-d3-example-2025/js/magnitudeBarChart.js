class MagnitudeBarChart {
  constructor(_config, _data) {
    this.config = _config;
    this.data = _data;
    this.attribute = d => d.mag; // Attribute for magnitude
    this.barColor = '#900000'; // Bar color for magnitude
    this.initVis();
  }

  initVis() {
    let vis = this;

    vis.filteredData = vis.data; // Initialize filtered data

    // Set up dimensions and margins
    vis.margin = { top: 20, right: 80, bottom: 70, left: 70 };
    vis.width = 500 - vis.margin.left - vis.margin.right;
    vis.height = 225 - vis.margin.top - vis.margin.bottom;

    // Create SVG container
    vis.svg = d3
      .select(vis.config.parentElement)
      .append('svg')
      .attr('width', vis.width + vis.margin.left + vis.margin.right)
      .attr('height', vis.height + vis.margin.top + vis.margin.bottom)
      .append('g')
      .attr('transform', `translate(${vis.margin.left},${vis.margin.top})`);

    // Create scales
    vis.xScale = d3.scaleLinear().range([0, vis.width]);
    vis.yScale = d3.scaleBand().range([0, vis.height]).padding(0.1);

    // Create axes
    vis.xAxis = vis.svg.append('g').attr('transform', `translate(0,${vis.height})`);
    vis.yAxis = vis.svg.append('g');

    // Add x-axis label
    vis.xAxisLabel = vis.svg
      .append('text')
      .attr('class', 'x-axis-label')
      .attr('x', vis.width / 2)
      .attr('y', vis.height + 50)
      .attr('text-anchor', 'middle')
      .text('Count');

    // Add y-axis label
    vis.yAxisLabel = vis.svg
      .append('text')
      .attr('class', 'y-axis-label')
      .attr('x', -vis.height / 2)
      .attr('y', -55)
      .attr('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)')
      .text('Magnitude Range');

    // Tooltip
    vis.tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    vis.updateVis();
  }

  updateVis() {
    let vis = this;

    // Create bins for histogram
    const bin = d3.bin()
      .domain(d3.extent(vis.filteredData, vis.attribute))
      .value(vis.attribute)
      .thresholds(5); // Number of bins
    const bins = bin(vis.filteredData);

    // Update scales
    vis.xScale.domain([0, d3.max(bins, d => d.length)]);
    vis.yScale.domain(bins.map(d => `${d.x0}-${d.x1}`));

    // Update axes
    vis.xAxis.call(d3.axisBottom(vis.xScale));
    vis.yAxis.call(d3.axisLeft(vis.yScale));

    // Bind data to bars
    const bars = vis.svg.selectAll('.bar').data(bins);

    // Enter
    bars
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('y', d => vis.yScale(`${d.x0}-${d.x1}`))
      .attr('x', 0)
      .attr('height', vis.yScale.bandwidth())
      .attr('width', d => vis.xScale(d.length))
      .attr('fill', vis.barColor)
      .on('mouseover', (event, d) => {
        vis.tooltip
          .style('opacity', 1)
          .html(`Count: ${d.length}`)
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY + 10}px`);
      })
      .on('mousemove', event => {
        vis.tooltip.style('left', `${event.pageX + 10}px`).style('top', `${event.pageY + 10}px`);
      })
      .on('mouseleave', () => {
        vis.tooltip.style('opacity', 0);
      })
      .on('click', function (event, d) {
                // Toggle the 'selected' class for the clicked bar
        const isSelected = d3.select(this).classed('selected');
        d3.select(this).classed('selected', !isSelected); // Toggle selection on clicked bar

        // Update the global filter
        if (isSelected) {
          // Remove the bar's value from the filter if it was already selected
          difficultyFilter = difficultyFilter.filter(f => f !== d.length);
        } else {
          // Add the bar's value to the filter if it is newly selected
          difficultyFilter.push(d.length);
        }

        // Call global function to update the map
        filterData();
      });

    // Update
    bars
      .attr('y', d => vis.yScale(`${d.x0}-${d.x1}`))
      .attr('x', 0)
      .attr('height', vis.yScale.bandwidth())
      .attr('width', d => vis.xScale(d.length))
      .attr('fill', vis.barColor);

    // Exit
    bars.exit().remove();
  }

  setFilteredData(filteredData) {
    this.filteredData = filteredData; // Update the filtered data
    this.updateVis(); // Re-render the visualization
  }

  highlightMagnitude(magnitude) {
    let vis = this;

    // Find the bin that contains the magnitude
    const bin = vis.svg.selectAll('.bar')
      .filter(d => d.x0 <= magnitude && magnitude < d.x1);

    // Highlight the corresponding bar
    vis.svg.selectAll('.bar').classed('highlighted', false); // Clear previous highlights
    bin.classed('highlighted', true);
  }
}
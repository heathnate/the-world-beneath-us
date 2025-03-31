class DepthBarChart {
    constructor(_config, _data) {
      this.config = _config;
      this.data = _data;
      this.attribute = d => d.depth; // Attribute for depth
      this.barColor = '#004d00'; // Bar color for depth
      this.initVis();
    }
  
    initVis() {
      // Same implementation as MagnitudeBarChart, but with depth-specific labels
      let vis = this;

      vis.filteredData = vis.data; // Initialize filtered data
  
      vis.margin = { top: 20, right: 80, bottom: 70, left: 70 };
      vis.width = 500 - vis.margin.left - vis.margin.right;
      vis.height = 250 - vis.margin.top - vis.margin.bottom;
  
      vis.svg = d3
        .select(vis.config.parentElement)
        .append('svg')
        .attr('width', vis.width + vis.margin.left + vis.margin.right)
        .attr('height', vis.height + vis.margin.top + vis.margin.bottom)
        .append('g')
        .attr('transform', `translate(${vis.margin.left},${vis.margin.top})`);
  
      vis.xScale = d3.scaleLinear().range([0, vis.width]);
      vis.yScale = d3.scaleBand().range([0, vis.height]).padding(0.1);
  
      vis.xAxis = vis.svg.append('g').attr('transform', `translate(0,${vis.height})`);
      vis.yAxis = vis.svg.append('g');
  
      vis.xAxisLabel = vis.svg
        .append('text')
        .attr('class', 'x-axis-label')
        .attr('x', vis.width / 2)
        .attr('y', vis.height + 50)
        .attr('text-anchor', 'middle')
        .text('Count');
  
      vis.yAxisLabel = vis.svg
        .append('text')
        .attr('class', 'y-axis-label')
        .attr('x', -vis.height / 2)
        .attr('y', -55)
        .attr('text-anchor', 'middle')
        .attr('transform', 'rotate(-90)')
        .text('Depth Range (km)');
  
      vis.tooltip = d3
        .select('body')
        .append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);
  
      vis.updateVis();
    }
  
    updateVis() {
      // Same implementation as MagnitudeBarChart, but with depth-specific bins
      let vis = this;
  
      const bin = d3.bin()
        .domain([0, d3.max(vis.filteredData, vis.attribute)])
        .value(vis.attribute)
        .thresholds(8);
      const bins = bin(vis.filteredData);
  
      vis.xScale.domain([0, d3.max(bins, d => d.length)]);
      vis.yScale.domain(bins.map(d => `${d.x0}-${d.x1}`));
  
      vis.xAxis.call(d3.axisBottom(vis.xScale));
      vis.yAxis.call(d3.axisLeft(vis.yScale));
  
      const bars = vis.svg.selectAll('.bar').data(bins);
  
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
          // Check if filter is already active
          const isActive = difficultyFilter.includes(d.length);
          if (isActive) { 
            // Remove filter
            difficultyFilter = difficultyFilter.filter(f => f !== d.length);
          } else { 
            // Add filter
            difficultyFilter.push(d.length);
            console.log(difficultyFilter);
          }
  
          // Call global function to update scatter plot
          filterData();
  
          // Toggle the 'selected' class for the clicked bar
          d3.select(this).classed('selected', !isActive);
        });
  
      bars
        .attr('y', d => vis.yScale(`${d.x0}-${d.x1}`))
        .attr('x', 0)
        .attr('height', vis.yScale.bandwidth())
        .attr('width', d => vis.xScale(d.length))
        .attr('fill', vis.barColor);
  
      bars.exit().remove();
    }

    setFilteredData(filteredData) {
        this.filteredData = filteredData; // Update the filtered data
        this.updateVis(); // Re-render the visualization
    }
}
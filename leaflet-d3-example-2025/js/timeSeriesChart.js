class TimeSeriesChart {
  constructor(_config, _data, _onBrush) {
    const mapWidth = document.getElementById('my-map').offsetWidth; // Dynamically get map width
    this.config = {
      parentElement: _config.parentElement,
      margin: { top: 20, right: 20, bottom: 40, left: 50 },
      width: mapWidth, // Set width to match map
      height: 200,
    };
    this.data = _data;
    this.onBrush = _onBrush; // Callback for brushing
    this.initVis();
  }

  initVis() {
    let vis = this;

    vis.width =
      vis.config.width -
      vis.config.margin.left -
      vis.config.margin.right;
    vis.height =
      vis.config.height -
      vis.config.margin.top -
      vis.config.margin.bottom;

    vis.svg = d3
      .select(vis.config.parentElement)
      .append("svg")
      .attr("width", vis.config.width)
      .attr("height", vis.config.height);

    vis.chart = vis.svg
      .append("g")
      .attr(
        "transform",
        `translate(${vis.config.margin.left},${vis.config.margin.top})`
      );

    // Scales
    vis.xScale = d3.scaleTime().range([0, vis.width]);
    vis.yScale = d3.scaleLinear().range([vis.height, 0]);

    // Axes
    vis.xAxis = d3.axisBottom(vis.xScale);
    vis.yAxis = d3.axisLeft(vis.yScale);

    vis.xAxisGroup = vis.chart
      .append("g")
      .attr("transform", `translate(0,${vis.height})`);
    vis.yAxisGroup = vis.chart.append("g");

    // Brush
    vis.brush = d3
      .brushX()
      .extent([
        [0, 0],
        [vis.width, vis.height],
      ])
      .on('brush', function ({selection}) {
        if (selection) {
          const [x0, x1] = selection.map(vis.xScale.invert);
          vis.onBrush(x0,x1);
        };
      })
      .on('end', function ({ selection }) {
        if (!selection) {
          const [x0, x1] = vis.xScale.domain();
          vis.onBrush(x0,x1)
        }
      });

    vis.chart.append("g").attr("class", "brush").call(vis.brush);

    vis.updateVis();
  }

  updateVis() {
    let vis = this;

    // Aggregate data by day
    const aggregatedData = d3.rollups(
      vis.data,
      (v) => v.length, // Count the number of occurrences
      (d) => d3.timeDay(new Date(d.time)).getTime() // Group by day (as a timestamp)
    );

    vis.aggregatedData = aggregatedData.map(([timestamp, count]) => ({
      date: new Date(timestamp), // Convert timestamp back to Date
      count,
    }));

    console.log("Aggregated Data:", vis.aggregatedData); // Debugging

    // Update scales
    vis.xScale.domain(d3.extent(vis.aggregatedData, (d) => d.date));
    vis.yScale.domain([0, d3.max(vis.aggregatedData, (d) => d.count)]);

    // Update axes
    vis.xAxisGroup.call(vis.xAxis);
    vis.yAxisGroup.call(vis.yAxis);

    // Draw line
    vis.chart
      .selectAll(".line")
      .data([vis.aggregatedData])
      .join("path")
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        d3
          .line()
          .x((d) => vis.xScale(d.date))
          .y((d) => vis.yScale(d.count))
      );
  }
}
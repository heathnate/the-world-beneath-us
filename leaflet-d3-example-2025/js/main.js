d3.csv('data/2024-2025.csv')
  .then(data => {
    data = preprocessQuakeData(data);

    // Initialize the map
    leafletMap = new LeafletMap({ parentElement: '#my-map' }, data);

    // Initialize the time-series chart
    const timeSeriesChart = new TimeSeriesChart(
      { parentElement: '#time-series-chart' },
      data,
      (startDate, endDate) => {
        // Filter data based on the selected time range
        const filteredData = data.filter(
          (d) => d.time >= startDate && d.time <= endDate
        );

        // Update the map with filtered data
        leafletMap.data = filteredData;
        leafletMap.updateVis(); // Ensure the map updates
      }
    );
  })
  .catch(error => console.error(error));

function preprocessQuakeData(rawData) {
  rawData = rawData
      .filter(d => d.latitude && d.longitude && d.mag && d.depth) // Remove missing data
      .filter(d => d.mag >= 4.0) // Focus on major earthquakes
      .map(d => ({
          ...d,
          localDateAndTime: new Date(d.time).toLocaleString(), // Convert to local time
  }));
  rawData.forEach(d => {
    d.time = new Date(d.time); // Convert to date object
    d.latitude = +d.latitude; // Convert to number
    d.longitude = +d.longitude; // Convert to number
    d.mag = +d.mag; // Convert to number
    d.depth = +d.depth; // Convert to number
  });
  return rawData;
}

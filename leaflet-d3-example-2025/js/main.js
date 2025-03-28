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

    // Auto-apply filter when date inputs change
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');

    function applyDateFilter() {
      const startDate = new Date(startDateInput.value);
      const endDate = new Date(endDateInput.value);

      if (startDate && endDate && startDate <= endDate) {
        // Filter data based on the selected date range
        const filteredData = data.filter(
          (d) => d.time >= startDate && d.time <= endDate
        );

        // Update the time-series chart and map
        timeSeriesChart.data = filteredData;
        timeSeriesChart.updateVis();
        leafletMap.data = filteredData;
        leafletMap.updateVis();
      }
    }

    startDateInput.addEventListener('change', applyDateFilter);
    endDateInput.addEventListener('change', applyDateFilter);

    // Reset button to restore full data range
    document.getElementById('reset-date-filter').addEventListener('click', () => {
      // Reset date inputs
      startDateInput.value = '';
      endDateInput.value = '';

      // Restore full data range
      timeSeriesChart.data = data;
      timeSeriesChart.updateVis();
      leafletMap.data = data;
      leafletMap.updateVis();
    });
  })
  .catch(error => console.error(error));

function preprocessQuakeData(rawData) {
  return rawData.map(d => ({
    ...d,
    time: new Date(d.time), // Ensure time is a Date object
    latitude: +d.latitude,
    longitude: +d.longitude,
    mag: +d.mag,
    depth: +d.depth,
  }));
}

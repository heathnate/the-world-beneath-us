d3.csv('data/2024-2025.csv')  //**** TO DO  switch this to loading the quakes 'data/2024-2025.csv'
.then(data => {
    // Preprocess data    
    data = preprocessQuakeData(data);

    // Initialize chart and then show it
    leafletMap = new LeafletMap({ parentElement: '#my-map'}, data);


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

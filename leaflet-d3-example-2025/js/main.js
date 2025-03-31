let leafletMap, barChart, magnitudeBarChart, depthBarChart, timeSeriesChart;
let data;

let difficultyFilter = [];

d3.csv('data/2024-2025.csv')
  .then(_data => {
    data = _data;
    data = preprocessQuakeData(data);

    // Initialize the map
    leafletMap = new LeafletMap({ parentElement: '#my-map' }, data);

    // Initialize the magnitude bar chart
    magnitudeBarChart = new MagnitudeBarChart({ parentElement: '#magnitude-bar-chart' }, data);

    // Initialize the depth bar chart
    depthBarChart = new DepthBarChart({ parentElement: '#depth-bar-chart' }, data);

    // Initialize the time-series chart
    timeSeriesChart = new TimeSeriesChart(
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
function filterData() {
  let fdata;
  let filarr = [false, false, false, false];
  if (difficultyFilter.length == 0) {
    fdata = data;
  } else {
    //based on the length of the bar we know which data we want filtered
    if(difficultyFilter.includes(12501))
    {
      //4-5
      filarr[0] = true;
    }
    if(difficultyFilter.includes(1461))
    {
      //5-6
      filarr[1] = true;
    }
    if(difficultyFilter.includes(4279))
    {
      //3-4
      filarr[2] = true;
    }
    if(difficultyFilter.includes(84))
    {
      //6-7
      filarr[3] = true;
    }
    if(filarr[0] && filarr[1] && filarr[2] && filarr[3])
    {
      fdata = data.filter(d => ((6 <= d.mag && d.mag < 7) || (3 <= d.mag && d.mag < 4) || (5 <= d.mag && d.mag < 6) || (4 <= d.mag && d.mag < 5)));
    }
    else if(filarr[0] && filarr[1] && filarr[2])
    {
      fdata = data.filter(d => ((3 <= d.mag && d.mag < 4) || (5 <= d.mag && d.mag < 6) || (4 <= d.mag && d.mag < 5)));
    }
    else if(filarr[0] && filarr[2] && filarr[3])
    {
      fdata = data.filter(d => ((6 <= d.mag && d.mag < 7) || (3 <= d.mag && d.mag < 4) || (4 <= d.mag && d.mag < 5)));
    }
    else if(filarr[0] && filarr[1] && filarr[3])
    {
      fdata = data.filter(d => ((6 <= d.mag && d.mag < 7) || (5 <= d.mag && d.mag < 6) || (4 <= d.mag && d.mag < 5)));
    }
    else if(filarr[1] && filarr[2] && filarr[3])
    {
      fdata = data.filter(d => ((6 <= d.mag && d.mag < 7) || (3 <= d.mag && d.mag < 4) || (5 <= d.mag && d.mag < 6)));
    }
    else if(filarr[0] && filarr[1])
    {
      fdata = data.filter(d => ((5 <= d.mag && d.mag < 6) || (4 <= d.mag && d.mag < 5)));
    }
    else if(filarr[0] && filarr[2])
    {
      fdata = data.filter(d => ((3 <= d.mag && d.mag < 4) || (4 <= d.mag && d.mag < 5)));
    }
    else if(filarr[0] && filarr[3])
    {
      fdata = data.filter(d => ((6 <= d.mag && d.mag < 7) || (4 <= d.mag && d.mag < 5)));
    }
    else if(filarr[1] && filarr[2])
    {
      fdata = data.filter(d => ((3 <= d.mag && d.mag < 4) || (5 <= d.mag && d.mag < 6)));
    }
    else if(filarr[1] && filarr[3])
    {
      fdata = data.filter(d => ((6 <= d.mag && d.mag < 7) || (5 <= d.mag && d.mag < 6)));
    }
    else if(filarr[2] && filarr[3])
    {
      fdata = data.filter(d => ((6 <= d.mag && d.mag < 7) || (3 <= d.mag && d.mag < 4)));
    }
    else if(filarr[0])
    {
      fdata = data.filter(d => (4 <= d.mag && d.mag < 5));
    }
    else if(filarr[1])
    {
      fdata = data.filter(d => (5 <= d.mag && d.mag < 6));
    }
    else if(filarr[2])
    {
      fdata = data.filter(d => (3 <= d.mag && d.mag < 4));
    }
    else
    {
      fdata = data.filter(d => (6 <= d.mag && d.mag < 7));
    }
  }
  console.log(fdata);
  leafletMap.data = fdata;
  leafletMap.updateVis();
}

let animation_interval;
const animation_progress_bar = document.getElementById("animation-progress");
console.log(animation_progress_bar);
function animation_filter() {
  const aniwindow = parseInt(document.getElementById("animation-window").value);
  var [speed, step] = document.getElementById("animation-speed").value.split(' ').map((n) => parseInt(n));


  clearInterval(animation_interval);

  const range = timeSeriesChart.xScale.domain();
  const nrange = (range[1].getTime() + 1000 * 60 * 60 * 24 * aniwindow - range[0].getTime());
  var d1 = new Date(range[0].getTime());
  var d0 = new Date(range[0].getTime());
  d0.setDate(d0.getDate() - aniwindow);
  var filteredData;

  const animate = () => {
    d1.setDate(d1.getDate() + step);
    d0.setDate(d0.getDate() + step);
    if (d0 >= range[1]) {
      filteredData = data;
      clearInterval(animation_interval);
      animation_progress_bar.value = 0;
    }
    else {
      filteredData = data.filter(
        (d) => d.time >= d0 && d.time <= d1
      );
      animation_progress_bar.value = 100 * (d1.getTime() - range[0].getTime()) / nrange;
    }
    leafletMap.data = filteredData;
    leafletMap.updateVis();
  }

  animation_interval = setInterval(animate, 1000 / speed);
}
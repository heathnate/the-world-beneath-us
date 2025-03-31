let leafletMap, barChart, magnitudeBarChart, depthBarChart, timeSeriesChart, startDateInput, endDateInput;
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

        magnitudeBarChart.setFilteredData(filteredData);
        depthBarChart.setFilteredData(filteredData);
      }
    );

    // Auto-apply filter when date inputs change
    startDateInput = document.getElementById('start-date');
    endDateInput = document.getElementById('end-date');

    startDateInput.addEventListener('change', filterData);
    endDateInput.addEventListener('change', filterData);

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
  let fdata, bdata, ndata, filteredData, check, check2;
  let a, b, c, e, f, g, h, i, j, k, l;
  check = false;
  check2 = false;
  fdata = data;
  bdata = data;
  filteredData = data;
  a = data.filter(d => (0 > d.mag));
  b = data.filter(d => (0 > d.mag));
  c = data.filter(d => (0 > d.mag));
  e = data.filter(d => (0 > d.mag));
  f = data.filter(d => (0 > d.mag));
  g = data.filter(d => (0 > d.mag));
  h = data.filter(d => (0 > d.mag));
  i = data.filter(d => (0 > d.mag));
  j = data.filter(d => (0 > d.mag));
  k = data.filter(d => (0 > d.mag));
  l = data.filter(d => (0 > d.mag));
  if (difficultyFilter.length == 0) {
    fdata = data;
    bdata = data;
  } else {
    //based on the length of the bar we know which data we want filtered
    if(difficultyFilter.includes(12501))
    {
      //4-5
      a = data.filter(d => (4 <= d.mag && d.mag < 5));
      check = true;
    }
    if(difficultyFilter.includes(1461))
    {
      //5-6
      b = data.filter(d => ((5 <= d.mag && d.mag < 6)));
      check = true;
    }
    if(difficultyFilter.includes(4279))
    {
      //3-4
      c = data.filter(d => ((3 <= d.mag && d.mag < 4)));
      check = true;
    }
    if(difficultyFilter.includes(84))
    {
      //6-7
      e = data.filter(d => ((6 <= d.mag && d.mag < 7)));
      check = true;
    }
    if(difficultyFilter.includes(14268))
    {
      //0-100
      f = data.filter(d => ((0 <= d.depth && d.depth < 100)));
      check2 = true;
    }
    if(difficultyFilter.includes(2307))
    {
      //100-200
      g = data.filter(d => ((100 <= d.depth && d.depth < 200)));
      check2 = true;
    }
    if(difficultyFilter.includes(549))
    {
      //200-300
      h = data.filter(d => ((200 <= d.depth && d.depth < 300)));
      check2 = true;
    }
    if(difficultyFilter.includes(184))
    {
      //300-400
      i = data.filter(d => ((300 <= d.depth && d.depth < 400)));
      check2 = true;
    }
    if(difficultyFilter.includes(224))
    {
      //400-500
      j = data.filter(d => ((400 <= d.depth && d.depth < 500)));
      check2 = true;
    }
    if(difficultyFilter.includes(645))
    {
      //500-600
      k = data.filter(d => ((500 <= d.depth && d.depth < 600)));
      check2 = true;
    }
    if(difficultyFilter.includes(127))
    {
      //600-700
      l = data.filter(d => ((600 <= d.depth && d.depth < 700)));
      check2 = true;
    }
    if(check)
    {
      fdata = data.filter(d => (a.includes(d) || b.includes(d) || c.includes(d) || e.includes(d)));
    }
    if(check2)
    {
      bdata = data.filter(d => (f.includes(d) || g.includes(d) || h.includes(d) || i.includes(d) || j.includes(d) || k.includes(d) || l.includes(d)));
    }
  }

  const startDate = new Date(startDateInput.value);
  const endDate = new Date(endDateInput.value);

  if (startDate && endDate && startDate <= endDate) {
    // Filter data based on the selected date range
    filteredData = data.filter((d) => d.time >= startDate && d.time <= endDate);

    // Update the time-series chart
    timeSeriesChart.data = filteredData;
    timeSeriesChart.updateVis();
  }

  ndata = data.filter(d => fdata.includes(d) && bdata.includes(d) && filteredData.includes(d))
  console.log(ndata);

  leafletMap.data = ndata;
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
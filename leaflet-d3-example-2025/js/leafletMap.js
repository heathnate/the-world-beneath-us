class LeafletMap {

  /**
   * Class constructor with basic configuration
   * @param {Object}
   * @param {Array}
   */
  constructor(_config, _data) {
    this.config = {
      parentElement: _config.parentElement,
    }
    this.data = _data;
    this.sizeByMagnitude = true; // Default toggle state
    this.defaultPointSize = 5; // Default point size (for when not scaling by magnitude)

    this.initVis();
  }
  
  /**
   * We initialize scales/axes and append static elements, such as axis titles.
   */
  initVis() {
    let vis = this;


    //ESRI
    vis.esriUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    vis.esriAttr = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';

    //TOPO
    vis.topoUrl ='https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
    vis.topoAttr = 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'

    //Thunderforest Outdoors- requires key... so meh... 
    vis.thOutUrl = 'https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey={apikey}';
    vis.thOutAttr = '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

    // This is the base map layer, where we are showing the map background
    vis.base_layer = L.tileLayer('https://tile.openstreetmap.de/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 1,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    vis.theMap = L.map('my-map', {
      center: [30, 0], // Default center position
      zoom: 2, // Default zoom level
      maxBounds: [[-90, -180], [90, 180]],
      layers: [vis.base_layer]
    });

    //if you stopped here, you would just have a map

    //initialize svg for d3 to add to map
    L.svg({clickable:true}).addTo(vis.theMap)// we have to make the svg layer clickable
    vis.overlay = d3.select(vis.theMap.getPanes().overlayPane)
    vis.svg = vis.overlay.select('svg').attr("pointer-events", "auto")    

    vis.colorScale = d3.scaleLinear()
      // .domain([0, d3.max(vis.data, d => d.mag)]) // Adjust the domain based on your data
      .domain(d3.extent(vis.data, d => d.mag))
      .range(["#ffefea", "#900000"]); // Light red to dark red

    //these are the city locations, displayed as a set of dots 
    vis.dots = vis.svg.selectAll('circle')
                    .data(vis.data) 
                    .join('circle')
                        .attr("fill", d =>vis.colorScale(d.mag)) 
                        .attr("stroke", "black")
                        //Leaflet has to take control of projecting points. 
                        //Here we are feeding the latitude and longitude coordinates to
                        //leaflet so that it can project them on the coordinates of the view. 
                        //the returned conversion produces an x and y point. 
                        //We have to select the the desired one using .x or .y
                        .attr("cx", d => vis.theMap.latLngToLayerPoint([d.latitude,d.longitude]).x)
                        .attr("cy", d => vis.theMap.latLngToLayerPoint([d.latitude,d.longitude]).y) 
                        .attr("r", vis.calculatePointSize())
                        .on('mouseover', function(event,d) { //function to add mouseover event
                            d3.select(this).transition() //D3 selects the object we have moused over in order to perform operations on it
                              .duration('150') //how long we are transitioning between the two states (works like keyframes)
                              .attr("fill", "red") //change the fill
                              .attr('r', d=> d.mag+10); //change radius

                            //create a tool tip
                            d3.select('#tooltip')
                                .style('opacity', 1)
                                .style('z-index', 1000000)
                                  // Format number with million and thousand separator
                                .html(`<div class="tooltip-label">Magnitude: ${d.mag}</div> 
                                       <div class="tooltip-label">Place: ${(d.place)}</div>
                                       <div class="tooltip-label">Local Time: ${d.localDateAndTime}</div>
                                       <div class="tooltip-label">Depth: ${d.depth} km</div>
                                    `);

                          })
                        .on('mousemove', (event) => {
                            //position the tooltip
                            d3.select('#tooltip')
                             .style('left', (event.pageX + 10) + 'px')   
                              .style('top', (event.pageY + 10) + 'px');
                         })              
                        .on('mouseleave', function() { // function to handle mouseleave event
                            d3.select(this).transition() // D3 selects the object we have moused over
                                .duration('150') // Transition duration
                                .attr("fill", vis.getColorValues()) // Reset the fill color
                                .attr('r', vis.calculatePointSize()); // Reset radius based on zoom level

                            d3.select('#tooltip').style('opacity', 0); // Hide the tooltip
                        });

    // Event listener to update point size after zooming in/out
    vis.theMap.on("zoomend", function() {
      vis.updateVis();
      vis.dots.attr('r', vis.calculatePointSize());
    });

  }

  updateVis() {
    let vis = this;    

   //redraw based on new zoom- need to recalculate on-screen position
    vis.svg.selectAll("circle")
      .data(vis.data)
      .join("circle")
      .attr("cx", d => vis.theMap.latLngToLayerPoint([d.latitude,d.longitude]).x)
      .attr("cy", d => vis.theMap.latLngToLayerPoint([d.latitude,d.longitude]).y)
      .attr("fill", vis.getColorValues())  //---- TO DO- color by magnitude 
      .attr("r", vis.calculatePointSize())
      .attr("stroke","black"); 
      .attr("r", vis.calculatePointSize())
      .attr("stroke","black");

  }


  renderVis() {
    let vis = this;

    //not using right now... 
 
  }

  updateColorScheme() {
    let vis = this;

    const colorBy = document.getElementById('colorBy').value;
    if (colorBy === 'magnitude') {
      //Design choice: Do we want to set the color scale to the extent of the data, or from 0 to the max? The extent option shows a more stark contrast
      // vis.colorScale.domain([0, d3.max(vis.data, d => d.mag)]).range(["#ffefea", "#900000"]);
        vis.colorScale.domain(d3.extent(vis.data, d => d.mag)).range(["#ffefea", "#900000"]);
    } else if (colorBy === 'year') {
        vis.colorScale.domain(d3.extent(vis.data, d => new Date(d.time).getFullYear())).range(["#d4f0ff", "#00509e"]);
    } else if (colorBy === 'depth') {
        vis.colorScale.domain([0, d3.max(vis.data, d => d.depth)]).range(["#e6ffe6", "#004d00"]);
    }
    vis.updateVis();
  }

  getColorValues() {
    let vis = this;

    const colorBy = document.getElementById('colorBy').value;
    if (colorBy === 'magnitude') {
      return d => vis.colorScale(d.mag);
    } else if (colorBy === 'year') {
      return d => vis.colorScale(new Date(d.time).getFullYear());
    } else if (colorBy === 'depth') {
      return d => vis.colorScale(d.depth);
    }
  }

  toggleSizeByMagnitude() {
    let vis = this;
    const sizeByMagnitude = document.getElementById('sizeByMagnitude').checked;
    vis.sizeByMagnitude = sizeByMagnitude; // Store the toggle state
    vis.updateVis();
  }

  updateMapBackground() {
    let vis = this;
    let mapUrl = '';
    let mapAttr = '';
    const mapBg = document.getElementById('mapBackground').value; // Get the selected map background option

    // Determine the URL and attribution based on the selected option
    if (mapBg === 'street') {
        mapUrl = 'https://tile.openstreetmap.de/{z}/{x}/{y}.png';
        mapAttr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
    } else if (mapBg === 'topo') {
        mapUrl = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
        mapAttr = 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)';
    } else if (mapBg === 'satellite') {
        mapUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
        mapAttr = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
    }

    // Remove the current base layer if it exists
    if (vis.base_layer) {
        vis.theMap.removeLayer(vis.base_layer);
    }

    // Add the new base layer
    vis.base_layer = L.tileLayer(mapUrl, {
        maxZoom: 18,
        minZoom: 1,
        attribution: mapAttr
    });

    vis.base_layer.addTo(vis.theMap); // Add the new layer to the map
  }

  calculatePointSize() {
    let vis = this;
    const zoomLevel = vis.theMap.getZoom();
    if (vis.sizeByMagnitude) {
      return d => Math.max(2, d.mag * (zoomLevel / 4)); // Scale size by zoom
    } else {
      return d => vis.defaultPointSize * (zoomLevel / 4);
    }
  }
}
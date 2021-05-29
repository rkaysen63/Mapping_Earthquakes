// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [40.7, -94.5],//NYC
	zoom: 3,
	layers: [streets]//default layer
});

// Create a base layer that holds all three maps.
let baseMaps = {
  "Streets": streets,
  "Satellite": satelliteStreets,
  "Dark": dark
};

// Create two overlay layers.  One for all earthquakes markers and one for tectonic plates.
// Del.1-1. Add a 2nd layer group for the tectonic plate data.
// Del.2-1. Add a 3rd layer group for the major earthquake data.
let allEarthquakes = new L.layerGroup();
let tectonicPlates = new L.layerGroup();
let majorEQ = new L.layerGroup();

// Del.1-2. Add a reference to the tectonic plates group to the overlays object.
// Del.2-2. Add a reference to the major earthquake group to the overlays object.
let overlays = {
  "Earthquakes": allEarthquakes,
  "Tectonic Plates": tectonicPlates,
  "Major Earthquakes": majorEQ
};

// Then we add a control to the map that will allow the user to change which
// layers are visible. Collapsed: false so that it's always visible.
L.control.layers(baseMaps, overlays, {
  collapsed: false
}).addTo(map);

// Retrieve the earthquake GeoJSON data for the allEarthquakes overlay.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {

  // This function returns the style data for each earthquake plotted on the map. The magnitude
  // of the earthquake is passed into two separate functions to calculate the color and radius.
  // Del.2-4. Use the same style as the earthquake data.

  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

  // This function determines the color of the marker based on the magnitude of the earthquake.
  // This function is called in the styleInfo() function as the value for fillColor key.
  // Del.2-5. Change the color function to use three colors for the major earthquakes based on 
  // the magnitude of the earthquake.
  function getColor(magnitude) {
    if (magnitude > 5) {
      return "#ea2c2c";
    }
    if (magnitude > 4) {
      return "#ea822c";
    }
    // Colors for Del.1 Earthquakes Layer -------------
    // if (magnitude > 3) {
      // return "#ee9c00";
    // }
    // if (magnitude > 2) {
      // return "#eecc00";
    // }
    // if (magnitude > 1) {
      // return "#d4ee00";
    // }
    // return "#98ee00";
    // -------------------------------------------------
    return "#ee9c00";
  }

  // This function determines the radius of the earthquake marker based on its magnitude.
  // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
  // This function is called in the styleInfo() function as the value for radius key.
  // Del.2-6. Use the function that determines the radius of the earthquake marker based on its magnitude.
  function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  }

  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    	// We turn each feature into a circleMarker on the map.
    	pointToLayer: function(feature, latlng) {
      		console.log(data);
      		return L.circleMarker(latlng);
        },
      // We set the style for each circleMarker using our styleInfo function.
      style: styleInfo,
      // We create a popup for each circleMarker to display the magnitude and location of the earthquake
      //  after the marker has been created and styled.
      onEachFeature: function(feature, layer) {
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<hr>Location: " + 
        feature.properties.place);
      }
  }).addTo(allEarthquakes);

  // Then we add the earthquake layer to our map.
  allEarthquakes.addTo(map);
// --------------------------------------------------------------------------------------
  // Del.2-3. Retrieve the major earthquake GeoJSON data >4.5 mag for the week.
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson").then(function(data) {
  // Del.2-7. Creating a GeoJSON layer with the retrieved data that adds a circle to the map 
  // sets the style of the circle, and displays the magnitude and location of the earthquake
  //  after the marker has been created and styled.
    L.geoJson(data, {
   	  // We turn each feature into a circleMarker on the map.
   	  pointToLayer: function(feature, latlng) {
        console.log(data);
        return L.circleMarker(latlng);
      },
    // Del.2-4. Use the same style as the earthquake data.  
    style: styleInfo,
    // We create a popup for each circleMarker to display the magnitude and location of the earthquake
    //  after the marker has been created and styled.
    onEachFeature: function(feature, layer) {
      let d = new Date(feature.properties.time);
      let formattedDate = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
      let hours = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours();
      let minutes = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();
      let formattedTime = hours + ":" + minutes;
      formattedDate = formattedDate + " " + formattedTime;
      console.log(formattedDate)

      layer.bindPopup("Major Earthquake<hr>Magnitude: " + 
      feature.properties.mag + "<br>Location: " + feature.properties.place +
      "<br>Date & Time : " + formattedDate);
    }

    }).addTo(majorEQ);      
  
  // Del.2-8. Add the major earthquakes layer to the map.
  majorEQ.addTo(map);
  // Del.2-9. Close the braces and parentheses for the major earthquake data.
  });
  
// --------------------------------------------------------------------------------------
  // Here we create a legend control object.
  let legend = L.control({
  position: "bottomright"
  });

  // Then add all the details for the legend
  legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");

    const magnitudes = [0, 1, 2, 3, 4, 5];
    const colors = [
      "#98ee00",
      "#d4ee00",
      "#eecc00",
      "#ee9c00",  
      "#ea822c",
      "#ea2c2c"
    ];

    // Looping through our intervals to generate a label with a colored square for each interval.
    for (var i = 0; i < magnitudes.length; i++) {
      console.log(colors[i]);
      div.innerHTML +=
        "<i style='background: " + colors[i] + "'></i> " +
        magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
    }
    return div;
  };

  // Finally, we our legend to the map.
  legend.addTo(map);

  // Del.1-3. Use d3.json to make a call to get our Tectonic Plate geoJSON data.
  d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json").then(function(data) {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJson(data, {
      color: "#e62e00",
      weight: 3,
      fillOpacity: 0,
    onEachFeature: function(feature, layer) {
          layer.bindPopup("Tectonic Plate<hr>Plate Code: " + feature.properties.Code + "<br>Plate Name: " + feature.properties.PlateName);
      }
    }).addTo(tectonicPlates);

    // Add earthquake layer to the map.
    tectonicPlates.addTo(map);
  });
});
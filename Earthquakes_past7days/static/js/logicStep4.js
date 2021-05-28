// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with center, zoom level, and default layer.
let map = L.map('mapid', {
  center: [39.5, -98.5], //Center of U.S.
  zoom: 3,
  layers: [streets] //default layer
});

// Create street view tile layer that will be default background of the map.
// Layers.js has variables for : streets, outdoors, light, dark,
// satellite, satelliteStreets, navigationDay, navigationNight

// Create a base layer that holds both maps.
let baseMaps = {
    "Satellite Streets": satelliteStreets,
    "Streets": streets
};

// Create the earthquake layer for the map.
let earthquakes = new L.layerGroup();

// Define an object that contains the overlays.
// This overlay will be visible all the time.
let overlays = {
  Earthquakes: earthquakes
};

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps, overlays).addTo(map);

// Retrieve the USGS Earthquake GeoJSON URL.
let earthquakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into two separate functions
// to calculate the color and radius.
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
// This function determines the color of the circle based on the magnitude of the earthquake.
function getColor(magnitude) {
    if (magnitude > 5) {
      return "#ea2c2c";//red
    }
    if (magnitude > 4) {
      return "#ea822c";//red orange
    }
    if (magnitude > 3) {
      return "#ee9c00";//orange
    }
    if (magnitude > 2) {
      return "#eecc00";//gold
    }
    if (magnitude > 1) {
      return "#d4ee00";//green yellow
    }
    return "#98ee00";//lt green
  }

// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
}

// Grab GeoJSON data.
d3.json(earthquakeData).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    // Turn each feature into a circleMarker on the map.
    pointToLayer: function(feature, latlng) {
        console.log(data);
        return L.circleMarker(latlng);
    },
    // Set the style for each circleMarker using the styleInfo function
    style: styleInfo,

    // We create a popup for each circleMarker to display the magnitude and
    //  location of the earthquake after the marker has been created and styled.
    onEachFeature: function(feature, layer) {
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
  }).addTo(earthquakes);

  // Add earthquake layer to the map.
  earthquakes.addTo(map);
});
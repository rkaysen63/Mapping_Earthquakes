// Add console.log to check to see if our code is working.
console.log("working");

// Create tile layer that will be background of the map. https://leafletjs.com/examples/quick-start/
// https://docs.mapbox.com/api/maps/styles/
// mapbox://styles/mapbox/streets-v11
// mapbox://styles/mapbox/dark-v10
// mapbox://styles/mapbox/light-v10
// mapbox://styles/mapbox/navigation-night-v1
// mapbox://styles/mapbox/navigation-day-v1
// mapbox://styles/mapbox/outdoors-v11
// Create street view tile layer that will be default background of the map.
// Define variables for our tile layers
// Create the light tile layer that will be an option for the map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "navigation-day-v1",
    accessToken: API_KEY
});

// Create the dark view tile layer that will be an option for the map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    "Day Navigation": light,
    "Night Navigation": dark
};

// Create the map object with center, zoom level, and default layer.
let map = L.map('mapid', {
    center: [44.0, -80.0], //Toronto's coordinates
    zoom: 2,
    layers: [light]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the Toronto airline routes GeoJSON URL.
let torontoData = "https://raw.githubusercontent.com/rkaysen63/Mapping_Earthquakes/main/torontoRoutes.json";

// Grab GeoJSON data.
d3.json(torontoData).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    // https://www.w3schools.com/colors/colors_picker.asp   
      color: "#ffff1a",
      weight: 2,
    // We turn each feature into a marker on the map.
    onEachFeature: function(feature, layer) { 
        console.log(layer);
        layer.bindPopup("<h3> Airline: " + feature.properties.airline +  
        "</h3><hr><h3> Destination: " + feature.properties.dst +"</h3>");
    }
  }).addTo(map);
});
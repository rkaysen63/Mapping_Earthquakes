// Add console.log to check to see if our code is working.
console.log("working");

// Create street view tile layer that will be default background of the map.
// Layers.js has variables for : streets, outdoors, light, dark,
// satellite, satelliteStreets, navigationDay, navigationNight

// Create the streets tile layer that will be an option for the map.
// let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    // attribution: 'Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    // maxZoom: 18,
    // id: "streets-v11",
    // accessToken: API_KEY
// });

// Create the satelliteStreets tile layer that will be an option for the map.
// let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    // attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    // maxZoom: 18,
    // accessToken: API_KEY
// });

// Create a base layer that holds both maps.
let baseMaps = {
    "Satellite Streets": satelliteStreets,
    "Streets": streets
};

// Create the map object with center, zoom level, and default layer.
let map = L.map('mapid', {
    center: [39.5, -98.5], //Center of U.S.
    zoom: 3,
    layers: [streets] //default layer
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Retrieve the USGS Earthquake GeoJSON URL.
let earthquakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Grab GeoJSON data.
d3.json(earthquakeData).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data).addTo(map);
});
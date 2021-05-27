// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with center and zoom level using .setView() method.
// let map = L.map('mapid').setView([30, 30], 2);

// Create tile layer that will be background of the map. https://leafletjs.com/examples/quick-start/
// https://docs.mapbox.com/api/maps/styles/
// mapbox://styles/mapbox/streets-v11
// mapbox://styles/mapbox/dark-v10
// mapbox://styles/mapbox/light-v10
// mapbox://styles/mapbox/navigation-night-v1
// mapbox://styles/mapbox/outdoors-v11
// Create street view tile layer that will be default background of the map.
// Define variables for our tile layers
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "streets-v11",
    accessToken: API_KEY
});

// Create the dark view tile layer that will be an option for the map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    Street: streets,
    Dark: dark
};

// Create the map object with center, zoom level, and default layer.
let map = L.map('mapid', {
    center: [30, 30],
    zoom: 2,
    layers: [streets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/rkaysen63/Mapping_Earthquakes/Mapping_GeoJSON_Points/Mapping_GeoJSON_Points/majorAirports.json";

// Grab GeoJSON data.
d3.json(airportData).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    // We turn each feature into a marker on the map.
    onEachFeature: function(feature, layer) {
        console.log(layer);
        layer.bindPopup("<h3> Airport Code: " + feature.properties.faa +  
        "</h3><hr><h3> Airport Name: " + feature.properties.name +"</h3>");
    }
  }).addTo(map);
});

// -------------------previous practice------------------------------------------
// / Add GeoJSON data.
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{ 
    // "type":"Feature",
    // "properties":{
        // "id":"3469",
        // "name":"San Francisco International Airport",
        // "city":"San Francisco",
        // "country":"United States",
        // "faa":"SFO",
        // "icao":"KSFO",
        // "alt":"13",
        // "tz-offset":"-8",
        // "dst":"A",
        // "tz":"America/Los_Angeles"},
        // "geometry":{
            // "type":"Point",
            // "coordinates":[-122.375,37.61899948120117]}}
// ]};
// 
// Grabbing our GeoJSON data.
// L.geoJson(sanFranAirport, {
    // We turn each feature into a marker on the map.
    // pointToLayer: function(feature, latlng) {
    //   console.log(feature);
    //   return L.marker(latlng)
    //   .bindPopup("<h2>" + feature.properties.name +
    //    "</h2><hr><h3>" + feature.properties.city +
        // ", " + feature.properties.country + "</h3>");
    // }

//   }).addTo(map);

// Grabbing our GeoJSON data.
// L.geoJson(sanFranAirport, {
    // We turn each feature into a marker on the map.
    // onEachFeature: function(feature, layer) {
    //   console.log(layer);
    //   layer.bindPopup("<h3> Airport Code: " + feature.properties.faa + 
        // "</h3><hr><h3> Airport Name: " + feature.properties.name +"</h3>");
    // }

//   }).addTo(map);
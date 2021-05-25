// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with center @ SFO and zoom level.
// let map = L.map('mapid').setView([37.6213, -122.3790], 5);

// Create the map object with center @ Omaha, NB and zoom level.
let map = L.map('mapid').setView([41.257160, -95.995102], 10);

// Create tile layer that will be background of the map. https://leafletjs.com/examples/quick-start/
// mapbox://styles/mapbox/streets-v11
// mapbox://styles/mapbox/dark-v10
// mapbox://styles/mapbox/satellite-streets-v11
// mapbox://styles/mapbox/light-v10
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// Add 'graymap' tile layer to the map.
streets.addTo(map);

// Map line between LAX and SFO.  Coordinates for each point to be used in the line.
// let line = [
    // [33.9416, -118.4085],
    // [37.6213, -122.3790],
    // [40.7899, -111.9791],
    // [47.4502, -122.3088]
// ];
// Create a polyline using the line coordinates and make the line yellow.
// L.polyline(line, {
    // color: "yellow"
//   }).addTo(map);

// Route: SFO - AUS - YYZ - JFK.  Coordinates for each point to be used in the line.
let line = [
    [37.6213, -122.3790],//SFO
    [30.1975, -97.6664],//AUS
    [43.6777, -79.6248],//YYZ
    [40.6413, -73.7781]//JFK
];
// Create a polyline using the line coordinates and make the line yellow.
L.polyline(line, {
    weight: 4,
    opacity: .5,
    color: "blue",
    dashArray: "10, 5",
  }).addTo(map);
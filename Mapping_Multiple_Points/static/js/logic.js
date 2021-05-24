// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([40.7, -94.5], 4);

// Create tile layer that will be background of the map. https://leafletjs.com/examples/quick-start/
// mapbox://styles/mapbox/streets-v11
// mapbox://styles/mapbox/dark-v10
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// Add 'graymap' tile layer to the map.
streets.addTo(map);

//  Add a marker to the map for Los Angeles, California.
// var marker = L.marker([34.0522, -118.2437]).addTo(map);

//  Add a circle marker to the map for Los Angeles, California.
var marker = L.circle([34.0522, -118.2437], {
    color: 'black',
    fillColor: '#ffffa1',
    fillOpacity: 0.5,
    radius: 300
 }).addTo(map);



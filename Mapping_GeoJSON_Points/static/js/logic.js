// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with center at the San Francisco airport w zoom level 10.
let map = L.map('mapid').setView([37.5, -122.5], 10);

// Create tile layer that will be background of the map. https://leafletjs.com/examples/quick-start/
// https://docs.mapbox.com/api/maps/styles/
// mapbox://styles/mapbox/streets-v11
// mapbox://styles/mapbox/dark-v10
// mapbox://styles/mapbox/light-v10
// mapbox://styles/mapbox/navigation-night-v1
// mapbox://styles/mapbox/outdoors-v11
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// Add 'graymap' tile layer to the map.
streets.addTo(map);

// / Add GeoJSON data.
let sanFranAirport =
{"type":"FeatureCollection","features":[{ 
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};

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
L.geoJson(sanFranAirport, {
    // We turn each feature into a marker on the map.
    onEachFeature: function(feature, layer) {
      console.log(layer);
      layer.bindPopup("<h3> Airport Code: " + feature.properties.faa + 
        "</h3><hr><h3> Airport Name: " + feature.properties.name +"</h3>");
    }

  }).addTo(map);
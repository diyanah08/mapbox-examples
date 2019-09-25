/*global mapboxgl*/
mapboxgl.accessToken = "pk.eyJ1IjoiZGl5YW5haDA4IiwiYSI6ImNrMHlwam9pNzBoc2QzYnA4ZXgydXFvY2cifQ.5Ou3JPEXHCQOJ-0H4Blltw";

let mapOptions = {
    container: 'map', //always put the id of where you want it to be
    style: 'mapbox://styles/mapbox/streets-v11', //can copy from the mapbox getting started
    center: [103.8198, 1.3521], //where the map should be centered, singapore
    zoom: 11, //how zoomed in
};
let map = new mapboxgl.Map(mapOptions);

// Create a Marker

let singaporeMarker = new mapboxgl.Marker()
    .setLngLat([103.8198, 1.3521]) //setting lng and lat of the marker with the ARRAY swuare brakets
    // creating new pop up
    .setPopup(new mapboxgl.Popup({
        offset: 25 // how far it is from the popup
    }).setHTML('<h3>Singapore</h3><p>Sunny island set in the sea</p>')) // what will be in the popup
    .addTo(map) // add to the map object created above
    
let changiAirportMarker = new mapboxgl.Marker()
    .setLngLat([103.9915, 1.3644])
    .setPopup(new mapboxgl.Popup({
        offset: 15
    }).setHTML('<h3>Singapore Changi Airport</h3><p>Best Airport</p>'))
    .addTo(map)

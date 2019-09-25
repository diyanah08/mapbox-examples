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

let marker = new mapboxgl.Marker()
    .setLngLat([103.8198,1.3521]) //setting lng and lat of the marker with the ARRAY swuare brakets
    .addTo(map); // add to the map object created above
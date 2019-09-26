/*global mapboxgl*/
/*global $*/
mapboxgl.accessToken = "pk.eyJ1IjoiZGl5YW5haDA4IiwiYSI6ImNrMHlwam9pNzBoc2QzYnA4ZXgydXFvY2cifQ.5Ou3JPEXHCQOJ-0H4Blltw";

let map
let all_markers = []

function setupMap(){
    map = new mapboxgl({
    container: 'map', //always put the id of where you want it to be
    style: 'mapbox://styles/mapbox/streets-v11', //can copy from the mapbox getting started
    center: [103.8198, 1.3521], //where the map should be centered, singapore
    zoom: 11, //how zoomed in
});
}

$(function(){
    setupMap();
    
});
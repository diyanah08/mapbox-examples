/*global mapboxgl*/
let places = [{
        'name': "Singapore Bird Park",
        'position': [103.7064, 1.3187],
        'image': 'images/birdpark.jpg'
    },
    {
        'name': "Singapore Zoo",
        'position': [103.7930, 1.4043],
        'image': 'images/zoo.jpg'
    },
    {
        'name': 'Changi Airport',
        'position': [103.9915, 1.3644],
        'image': 'images/jewel.jpg'
    },
    {
        'name': 'Gardens By The Bay',
        'position': [103.8636, 1.2816],
        'image': 'images/gbtb.jpg'
    }
]

mapboxgl.accessToken = "pk.eyJ1IjoiZGl5YW5haDA4IiwiYSI6ImNrMHlwam9pNzBoc2QzYnA4ZXgydXFvY2cifQ.5Ou3JPEXHCQOJ-0H4Blltw";

let mapOptions = {
    container: 'map', //always put the id of where you want it to be
    style: 'mapbox://styles/mapbox/streets-v11', //can copy from the mapbox getting started
    center: [103.8198, 1.3521], //where the map should be centered, singapore
    zoom: 10, //how zoomed in
};
let map = new mapboxgl.Map(mapOptions);

// Create a Marker
for (let each_place of places) {
    let m = new mapboxgl.Marker();
    let p = new mapboxgl.Popup({
        offset: 25
    });
    m.setLngLat(each_place.position);
    p.setHTML(`<h3>${each_place.name}</h3>
                <img src="${each_place.image}"/>`);
    m.setPopup(p);
    m.addTo(map);
}
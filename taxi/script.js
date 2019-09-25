/*global $*/
/*global axios*/
/*global mapboxgl*/

function taxiAvailability() {
  axios.get("https://api.data.gov.sg/v1/transport/taxi-availability")
    .then(function(response) {
      let taxiLocation = response.data.features[0].geometry.coordinates;
      for (let i = 0; i < taxiLocation.length; i++) {
        let m = new mapboxgl.Marker();
        let p = new mapboxgl.Popup({
          offset: 25
        });
        m.setLngLat([taxiLocation[i][0], taxiLocation[i][1]]);
        p.setHTML("<h3>There's a taxi here!</h3>");
        m.setPopup(p);
        m.addTo(map);
      }
    });
}

mapboxgl.accessToken = "pk.eyJ1IjoiZGl5YW5haDA4IiwiYSI6ImNrMHlwam9pNzBoc2QzYnA4ZXgydXFvY2cifQ.5Ou3JPEXHCQOJ-0H4Blltw";

let mapOptions = {
  container: 'map', //always put the id of where you want it to be
  style: 'mapbox://styles/mapbox/streets-v11', //can copy from the mapbox getting started
  center: [103.8198, 1.3521], //where the map should be centered, singapore
  zoom: 10, //how zoomed in
};
let map = new mapboxgl.Map(mapOptions);

taxiAvailability();

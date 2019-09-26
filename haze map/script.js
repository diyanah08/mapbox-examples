/*global mapboxgl*/
/*global axios*/

function testGetPSI()
{
    axios.get("https://api.data.gov.sg/v1/environment/psi")
    .then(function(response){
        let regions = response.data.region_metadata
        let psi_readings = response.data.items[0].readings.psi_twenty_four_hourly
        
        for (let each_region of regions) {
            let area = each_region.name
            let each_psi_reading = psi_readings[area]
            let marker = new mapboxgl.Marker();
                marker.setLngLat([each_region.label_location.longitude, each_region.label_location.latitude])
            let popup = new mapboxgl.Popup({
                offset: 25
            });
                popup.setHTML(area + " PSI: " + each_psi_reading)
                marker.setPopup(popup)
                
                marker.addTo(map)
        }
    })
}


mapboxgl.accessToken = "pk.eyJ1IjoiZGl5YW5haDA4IiwiYSI6ImNrMHlwam9pNzBoc2QzYnA4ZXgydXFvY2cifQ.5Ou3JPEXHCQOJ-0H4Blltw";

let mapOptions = {
    container: 'map', //always put the id of where you want it to be
    style: 'mapbox://styles/mapbox/streets-v11', //can copy from the mapbox getting started
    center: [103.8198, 1.3521], //where the map should be centered, singapore
    zoom: 11, //how zoomed in
};
let map = new mapboxgl.Map(mapOptions);
testGetPSI()
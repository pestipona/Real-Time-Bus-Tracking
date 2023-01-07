// import mapbox public api token
mapboxgl.accessToken = '<PLACE-YOUR-PUBLIC-TOKEN-HERE>';

// create a map with style, coordinates, and zoom
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-71.104081, 42.365554],
    zoom: 14
});

// Get Real-Time Bus Data
async function getBusLocations(){
    const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
    const response = await fetch(url);
    const json = await response.json();
    return json.data;
}

async function getBusCoordinates(){
    // Get Real-time Bus Location
    const locations = await getBusLocations();
    let coordinates = {
        Lng: locations[0].attributes.longitude,
        Lat: locations[0].attributes.latitude
    };
    return coordinates;
}

// create a custom icon for the Marker
var icon = document.createElement('div');
icon.className = 'marker';

// Create and add the custom Marker to the Map
var marker = new mapboxgl.Marker(icon)
    .setLngLat([-71.092761, 42.357575])
    .addTo(map);


// Update Marker on Real Time
async function move() {
    // Get Real-time Bus Location
    const coordinates = await getBusCoordinates();
    let Lng = coordinates.Lng;
    let Lat = coordinates.Lat;

    // For Tracking & Debugging
    console.log(new Date());
    console.log(Lng);
    console.log(Lat);

    // Move Marker based on new location
    setTimeout(() => {
        marker.setLngLat([Lng, Lat]);
        move();
    }, 8000);
}
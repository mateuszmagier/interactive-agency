let map;

function initMap() {
    let newYork = {
        lat: 40.71427,
        lng: -74.00597
    };

    let options = {
        center: newYork,
        zoom: 11
    };

    let map = new google.maps.Map(document.getElementById('map'), options);

    let markerIcon = 'img/marker_small.png';
    let marker = new google.maps.Marker({
        position: newYork,
        map: map,
        icon: markerIcon
    });
}

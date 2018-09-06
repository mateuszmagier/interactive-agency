let map;
let markerIcon = 'img/marker_small.png';

//const media = window.matchMedia("(max-width: 500px)");
//
//if (media.matches) {
//    console.log("smaller")
//    markerIcon = 'img/marker_smaller.png';
//} else {
//    markerIcon = 'img/marker_small.png';
//}
//
//media.addListener(function (media) {
//    if (media.matches) {
//        markerIcon = 'img/marker_smaller.png';
//    } else {
//        markerIcon = 'img/marker_small.png';
//    }
//});

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

    let marker = new google.maps.Marker({
        position: newYork,
        map: map,
        icon: markerIcon
    });
}

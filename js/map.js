let map;

function initMap() {
    let newYork = {
        lat: 40.71427,
        lng: -74.00597
    };
    
    let map = new google.maps.Map(document.getElementById('map'), {
        center: newYork,
        zoom: 11
    });
    
    let marker = new google.maps.Marker({position: newYork, map: map});
}

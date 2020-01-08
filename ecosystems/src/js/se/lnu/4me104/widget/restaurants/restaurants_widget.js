var map;
var service;

var infowindow;
var request;
var markers= [];

function initialize(){
	var center= new google.maps.LatLng(56.87885,14.8169763);
	
	map=new google.maps.Map(document.getElementById('map_places'),{
	center: center,
	zoom: 14
	
	});
	request = {
    location: center,
    radius: '5000',
    query: 'restaurant'
  };
  
  infowindow = new google.maps.InfoWindow();

  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);
  
    google.maps.event.AddListener(map, 'rightClick', function(event){
  	 map.setCenter(event.latLng)
  	 clearResults(markers)
  	
  	 var request = {
  		location: event.latLng,
  		radius: '500',
  		query: 'restaurant'
  	 };
  	
  	 service.textSearch(request, callback);
  	
  	})

}

function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            markers.push(createMarker(results[i]));
          }
     }
}


function createMarker(place) {
        
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location         

        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent('<div style="text-align:center"><strong>'+place.name+ '</strong><br>'
          +place.formatted_address+ '</div>');
          infowindow.open(map, this);
        });
        return marker;
}

function clearResults(markers){
	for (var m in markers){
	   markers[m].setMap(null)
	}
      markers = []
}


google.maps.event.addDomListener(window, 'load', initialize);
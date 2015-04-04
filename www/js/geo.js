document.addEventListener('deviceready', initializeMap, false);
function initializeMap() {
	// display the map 
	// listen for a click event on the map 
	// use the ev.latLng to display a marker on the map 
	
    var mapOptions = {
        center: new google.maps.LatLng(43.069452, -89.411373),
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("theMap"), mapOptions);
	
	//create the map
	//map = new google.maps.Map(document.getElementById("map"), myOptions);
	var image = 'images/myicon.png';
	var shadowimage = 'images/shadow.png';
	//png is best as it has an alpha channel.  ,icon: image
	
	
	
	var marker = new google.maps.Marker({
    position: new google.maps.LatLng(43.069452, -89.411373),
    map: map,
    title: "User Location",
	draggable: true, 
    animation: google.maps.Animation.BOUNCE
});
	google.maps.event.addListener(marker, 'tap', one);
	//marker.setMap(map);	//to add the marker to the map
	
	
	//Add a marker whenever and whereever the user clicks
	//google.maps.event.addListener(map, 'click', two);
}

function two(ev){
	//called when the user clicks anywhere on the map
	//ev is the MouseEvent which knows the LatLng of where the user clicked
	var m = new google.maps.Marker({
		position: ev.latLng,
		animation: google.maps.Animation.BOUNCE
	});
	google.maps.event.addListener(m, 'click', function(ev){
		three(ev, m);
	});
	/*
	m.setMap( map );
	google.maps.event.addListener(m, 'click', function(ev){
		//this runs when the user clicks the NEW marker
		three(ev, m);	
	});
	*/
}

function three(ev, newMarker){
	newMarker.setAnimation(null);
}

function one(ev){
	alert(ev.type);	
	if (marker.getAnimation() != null) {
		marker.setAnimation(null);
		//add an infoWindow
		var myHtml = '<h2>MyTitle</h2><p>Other info</p>';
		var iw = new google.maps.InfoWindow({
			content: myHtml
		});
		iw.open(map, marker);
	} else {
		marker.setAnimation(google.maps.Animation.BOUNCE);
	}
}

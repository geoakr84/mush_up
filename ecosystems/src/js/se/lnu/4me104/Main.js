/**
 *	The main class for the mashup example. This class is 
 *	responsible for initiating the application components 
 *	(widgets). If new components are created, they will 
 *	be added via this class.
 *
 *	This class is written as a static JavaScript class. 
 *	The static format is suitable because the class is 
 *	never meant to be instantiated. The instance that is 
 *	stored in the main property is accessible via the 
 *	browser window object, ie in the global scope.
 *
 *	NOTE: All JavaScript files under se.lnu.4me104 should 
 *	be "compiled" or joined into a js file for increased 
 *	performance. For this code to remain easy to read, I 
 *	have chosen not to "compile" it.
 *
 *	@author		Henrik Andersen <henrik.andersen@lnu.se>
 *	@copyright	Copyright (c) 2013.
 *	@license	Creative Commons (BY-NC-SA)
 *	@version	1.0.
 *	@since		2013-11-11
 */
var Main = {

	//---------------------------------------------------
	//	Public static properties
	//---------------------------------------------------

	/**
	 *	...
	 *
	 *	@default {null}
	 */
	careerWidget : null,

	/**
	 *	Referns to the object that handles hotel 
	 *	searches. The searches are made via an RSS feed 
	 *	from the kayak. A local proxy is used to convert 
	 *	the RSS feed into an API-like interface. for more 
	 *	information see HotelService.php (src/php).
	 *
	 *	@default {null}
	 */
	hotelWidget : null,

	/**
	 *	Referns to object that handles comparison of 
	 *	weather. The comparison is made with an API from 
	 *	wolfram alpha. The comparison is made with their 
	 *	API via a local proxy, for more information see 
	 *	CompareService.php (src/php).
	 *
	 *	@default {null}
	 */
	compareWidget : null,

	/**
	 *	Referns to object that handles the map in the 
	 *	application. The map is an instance of the Google 
	 *	Maps API.
	 *
	 *	@default {null}
	 */
	MapWidget : null,

	/**
	 *	Referns to the object that handles the weather 
	 *	forecast. The object gets its information from 
	 *	Wunderground's API.
	 *
	 *	@default {null}
	 */
	weatherWidget : null,

	//---------------------------------------------------
	//	Public static methods
	//---------------------------------------------------

	/**
	 *	This method works as a constructor method and 
	 *	initializes the components that belong to the 
	 *	application.
	 *
	 *	@return {undefined}
	 */
	init : function() {
		var target = document.getElementById("page-right-wrapper");

		Main.careerWidget   = new CareerWidget(target);
		Main.mapWidget 		= new MapWidget();
		//Main.hotelWidget 	= new HotelWidget();
		Main.compareWidget 	= new CompareWidget();
		Main.weatherWidget 	= new WeatherWidget();
	}
}

/*
 *	Bootstrap for this application. Since Google's library 
 *	is imported, we might as well use it for event handling.
 */
google.maps.event.addDomListener(window, "load", Main.init);
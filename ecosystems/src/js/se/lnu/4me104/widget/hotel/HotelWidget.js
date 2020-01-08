/**
 *	This class handles the website's hotel-widget.
 *
 *	@author		Henrik Andersen <henrik.andersen@lnu.se>
 *	@copyright	Copyright (c) 2013.
 *	@license	Creative Commons (BY-NC-SA)
 *	@version	1.0.
 *	@since		2013-11-11
 */
function HotelWidget() {

	//---------------------------------------------------
	//	Private properties
	//---------------------------------------------------

	/**
	 *	Reference to the DOM element used to set a 
	 *	minimum price. These are HTML5 elements and is 
	 *	not backwards compatible with older browsers.
	 *
	 *	@default {DOMElement}
	 */
	var _elmSliderMinValue = document.getElementById("hotel-range-min-value");

	/**
	 *	Reference to the DOM element used to set a 
	 *	maximum price. These are HTML5 elements and is 
	 *	not backwards compatible with older browsers.
	 *
	 *	@default {DOMElement}
	 */
	var _elmSliderMaxValue = document.getElementById("hotel-range-max-value");

	/**
	 *	Reference to the object that handles the search 
	 *	data. For more information see HotelWidgetResult.
	 *
	 *	@default {HotelWidgetResult}
	 */
	var _resultTable = new HotelWidgetResult("page-right-hotel-result-wrapper");

	//---------------------------------------------------
	//	Private methods
	//---------------------------------------------------

	/**
	 *	This method is used as the class constructor.
	 *
	 *	@return {undefined}
	 */
	function init() {
		initSlider();
		initSubmit();
	}

	/**
	 *	Init range sliders.
	 *
	 *	@return {undefined}
	 */
	function initSlider() {
		initSliderMin();
		initSliderMax();
	}

	/**
	 *	Enables element used to determine minimum price.
	 *
	 *	@return {undefined}
	 */
	function initSliderMin() {
		var element = document.getElementById("hotel-range-min");
			element.value = element.min;

		google.maps.event.addDomListener(element, "change", onSliderMinChange);
	}

	/**
	 *	Enables element used to determine maximum price.
	 *
	 *	@return {undefined}
	 */
	function initSliderMax() {
		var element = document.getElementById("hotel-range-max");
			element.value = element.max;

		google.maps.event.addDomListener(element, "change", onSliderMaxChange);
	}

	/**
	 *	Enables element used to submit search request. 
	 *
	 *	@return {undefined}
	 */
	function initSubmit() {
		var element = document.getElementById("hotel-submit-btn");
		google.maps.event.addDomListener(element, "click", onSubmitClick);
	}

	/**
	 *	This method is activated each time the user updates 
	 *	the minimum price. The purpose is to synchronize 
	 *	the element with the amount shown on the website.
	 *
	 *	@param	{event}	The event that triggered this method.
	 *
	 *	@return {undefined}
	 */
	function onSliderMinChange(event) {
		_elmSliderMinValue.innerHTML = event.currentTarget.value;
	}

	/**
	 *	This method is activated each time the user updates 
	 *	the maximum price. The purpose is to synchronize 
	 *	the element with the amount shown on the website.
	 *
	 *	@param	{event}	The event that triggered this method.
	 *
	 *	@return {undefined}
	 */
	function onSliderMaxChange(event) {
		_elmSliderMaxValue.innerHTML = event.currentTarget.value;
	}

	/**
	 *	This mode is activated when the search button is 
	 *	activated.
	 *
	 *	@param	{event}	The event that triggered this method.
	 *
	 *	@return {undefined}
	 */
	function onSubmitClick(event) {
		event.preventDefault(); // Since we are using AJAX, we do not send the form data.
		removeResults();
		searchResults();
	}

	/**
	 *	This method removes the previous results from the 
	 *	DOM structure.
	 *
	 *	@return {undefined}
	 */
	function removeResults() {
		_resultTable.remove(true);
	}

	/**
	 *	This method retrieves hotel-information from the 
	 *	local proxy. For more information see 
	 *	HotelService.php (src/php). The method uses 
	 *	jQuery to perform the AJAX call, just like any 
	 *	other widget.
	 *
	 *	@return {undefined}
	 */
	function searchResults() {
		var min = parseInt(_elmSliderMinValue.innerHTML);
		var max = parseInt(_elmSliderMaxValue.innerHTML);

		$.get("src/php/HotelService.php?priceMin="+min+"&priceMax="+max, onSearchResultsComplete);
	}

	/**
	 *	This method is activated when the information 
	 *	is derived from the proxy. The information is 
	 *	converted from a string to a JSON object
	 *
	 *	@param	{String}	The result data.
	 *
	 *	@return {undefined}
	 */
	function onSearchResultsComplete(data) {
		data = JSON.parse(data);
		_resultTable.append(data);
	}

	init();
}
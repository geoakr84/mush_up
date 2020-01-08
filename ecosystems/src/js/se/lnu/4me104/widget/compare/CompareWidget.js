/**
 *	This class handles the website's compare-widget.	
 *
 *	This class is very similar to the Hotel Widget class, 
 *	but not enough to implement a superclass. In future 
 *	implementations, this can be improved to avoid 
 *	redundant code.
 *
 *	@author		Henrik Andersen <henrik.andersen@lnu.se>
 *	@copyright	Copyright (c) 2013.
 *	@license	Creative Commons (BY-NC-SA)
 *	@version	1.0.
 *	@since		2013-11-11
 */
function CompareWidget() {

	//---------------------------------------------------
	//	Private properties
	//---------------------------------------------------

	/**
	 *	Reference to the DOM element used to input town 
	 *	name.
	 *
	 *	@default {DOMElement}
	 */
	var _elmTownValue = document.getElementById("compare-town");

	/**
	 *	Reference to the DOM element used to input date 
	 *	name.
	 *
	 *	@default {DOMElement}
	 */
	var _elmDateValue = document.getElementById("compare-date");

	/**
	 *	Reference to the object that handles the compare 
	 *	data. For more information see CompareWidgetResult.
	 *
	 *	@default {HotelWidgetResult}
	 */
	var _resultTable = new CompareWidgetResult("page-right-compare-result-wrapper");

	//---------------------------------------------------
	//	Private methods
	//---------------------------------------------------

	/**
	 *	The class constructor.
	 *
	 *	@return {undefined}
	 */
	function init() {
		initDateElement();
		initSubmit();
		initDatePicker();
	}

	/**
	 *	...
	 *
	 *	@return {undefined}
	 */
	function initDateElement() {
		var date = new Date();
		var dateString = (date.getMonth() + 1) + "/";
			dateString += date.getDate() + "/";
			dateString += date.getFullYear();

		_elmDateValue.placeholder = dateString;
	}

	/**
	 *	Using Google's event handler to activate the 
	 *	widget compare button.
	 *
	 *	@return {undefined}
	 */
	function initSubmit() {
		var element = document.getElementById("compare-submit-btn");
		google.maps.event.addDomListener(element, "click", onSubmitClick);
	}

	/**
	 *	This method uses jQueryUI to offer the user a 
	 *	date picker. It would be a simpler solution to use 
	 *	HTML5's date-element, but it is not implemented in 
	 *	all browsers, and should therefore not be used. In 
	 *	future implementations, this method may change but 
	 *	for now we will use jQueryUI.
	 *
	 *	@return {undefined}
	 */
	function initDatePicker() {
		$("#compare-date").datepicker();
	}

	/**
	 *	This mode is activated when the user makes a 
	 *	weather comparison (clicking on the compare button). 
	 *	The purpose is to clean up old information and 
	 *	present new.
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
	 *	Removes old results presented in the DOM 
	 *	structure.
	 *
	 *	@return {undefined}
	 */
	function removeResults() {
		_resultTable.remove(true);
	}

	/**
	 *	Using the proxy to compare weather.
	 *
	 *	@return {undefined}
	 */
	function searchResults() {
		var town = _elmTownValue.value || _elmTownValue.placeholder;
		var date = _elmDateValue.value || _elmDateValue.placeholder;
			date = new Date(Date.parse(date));

		$.get('src/php/CompareService.php?day=' + date.getDate() + '&month=' + (date.getMonth() + 1) + '&year=' + date.getFullYear() + '&town=' + town, onSearchResultsComplete);
	}

	/**
	 *	This method is activated when the weather 
	 *	comparison is completed. The purpose of this 
	 *	method is to convert response data to JSON and 
	 *	present the results via the CompareWidgetResult 
	 *	object.
	 *
	 *	@param	{String}	Result data.
	 *
	 *	@return {undefined}
	 */
	function onSearchResultsComplete(data) {
		data = JSON.parse(data);
		_resultTable.append(data);
	}

	init();
}
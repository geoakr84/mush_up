/**
 *	Manages and presents search data from the hotel widget.
 *
 *	@author		Henrik Andersen <henrik.andersen@lnu.se>
 *	@copyright	Copyright (c) 2013.
 *	@license	Creative Commons (BY-NC-SA)
 *	@version	1.0.
 *	@since		2013-11-11
 */
function HotelWidgetResult(parent) {

	//---------------------------------------------------
	//	Private properties
	//---------------------------------------------------

	/**
	 *	
 	 *	Private reference used to reference the object 
 	 *	instance when the internal scope ine is available. 
 	 *	For example, this property can be used to access 
 	 *	public properties and methods from private 
 	 *	class methods.
	 *
	 *	@default {null}
	 */
	var _this = this;

	/**
	 *	Reference to the element that the results will 
	 *	be presented in.
	 *
	 *	@default {DOMElement}
	 */
	var _parent = document.getElementById(parent);

	/**
	 *	Reference to the table element used for 
	 *	presenting information.
	 *
	 *	@default {DOMElement}
	 */
	var _table = document.createElement("table");

	//---------------------------------------------------
	//	Public static methods
	//---------------------------------------------------

	/**
	 *	This is a singleton method to add information in 
	 *	the result. The results are presented in a table 
	 *	element.
	 *
	 *	@param	{JSON} Hotel data.
	 *
	 *	@return {undefined}
	 */
	HotelWidgetResult.prototype.append = function(data) {
		disposeChildren(_parent);
		appendHead();
		appendBody(data);
		_parent.appendChild(_table);
		createRemoveButton();
	}

	/**
	 *	This is a singleton method for removing hotel 
	 *	results from the widget.
	 *
	 *	@param	{Boolean}	If new information is about to be presented.
	 *
	 *	@return {undefined}
	 */
	HotelWidgetResult.prototype.remove = function(loading) {
		loading = loading || false;
		disposeChildren(_table);
		disposeChildren(_parent);

		if (loading) {
			createLoader();
		}
	}

	//---------------------------------------------------
	//	Private methods
	//---------------------------------------------------

	/**
	 *	Removes the children and clears them from memory.
	 *
	 *	@param	{DOMElement} The element that is the the parent of the children.
	 *
	 *	@return {undefined}
	 */
	function disposeChildren(element) {
		var child = null;
		while (element.firstChild) {
			child = element.firstChild;
			element.removeChild(child);
			child = null;
		}
	}

	/**
	 *	Creates a loading icon and adds it to the DOM 
	 *	structure.
	 *
	 *	@return {undefined}
	 */
	function createLoader() {
		var loader = document.createElement("div");
			loader.setAttribute("class", "loader");

		_parent.appendChild(loader);
	}

	/**
	 *	Adds a header to the results table.
	 *
	 *	@return {undefined}
	 */
	function appendHead() {
		appendRow("th", "Name", "Stars", "Price");
	}

	/**
	 *	Adds information in the results table.
	 *
	 *	@param	{data}	Results data.
	 *
	 *	@return {undefined}
	 */
	function appendBody(data) {
		for (var i = 0; i < data.length; i++) {
			appendRow("td", data[i].name, data[i].stars, data[i].price, data[i].externalLink);
		}
	}

	/**
	 *	Adds a row to the results table.
	 *
	 *	@param	{String}	...
	 *	@param	{String}	...
	 *	@param	{int}		...
	 *	@param	{float}		...
	 *	@param	{String}	...
	 *
	 *	@return {undefined}
	 */
	function appendRow(type, name, stars, price, link) {
		var tr = document.createElement("tr");

		var tn = document.createElement(type);
			tn.innerHTML = link ? createAsHyperLink(name, link) : name;

		var ts = document.createElement(type);
			ts.innerHTML = stars;

		var tp = document.createElement(type);
			tp.innerHTML = price;

		tr.appendChild(tn);
		tr.appendChild(ts);
		tr.appendChild(tp);

		_table.appendChild(tr);
	}

	/**
	 *	Converts a result value to a hyperlink.
	 *
	 *	@return {DOMElement}
	 */
	function createAsHyperLink(value, URL) {
		var temp = document.createElement("div");
		var link = document.createElement("a");
			link.innerHTML = value;
			link.href = URL;

		temp.appendChild(link);
		return temp.innerHTML;
	}

	/**
	 *	Creates a button element to remove a search 
	 *	result from the widget.
	 *
	 *	@return {undefined}
	 */
	function createRemoveButton() {
		var button = document.createElement("button");
			button.innerHTML = "Remove results";
			google.maps.event.addDomListener(button, "click", function(event){
				_this.remove(false);
			});

		_parent.appendChild(button);
	}
}
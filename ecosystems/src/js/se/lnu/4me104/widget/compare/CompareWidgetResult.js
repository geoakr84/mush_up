/**
 *	...
 *
 *	@author		Henrik Andersen <henrik.andersen@lnu.se>
 *	@copyright	Copyright (c) 2013.
 *	@license	Creative Commons (BY-NC-SA)
 *	@version	1.0.
 *	@since		2013-11-11
 */
function CompareWidgetResult(parent) {

	//---------------------------------------------------
	//	Private properties
	//---------------------------------------------------

	/**
	 *	...
	 *
	 *	@default {null}
	 */
	var _this = this;

	/**
	 *	...
	 *
	 *	@default {DOMElement}
	 */
	var _parent = document.getElementById(parent);

	/**
	 *	...
	 *
	 *	@default {null}
	 */
	var _table = document.createElement("table");

	//---------------------------------------------------
	//	Public static methods
	//---------------------------------------------------

	/**
	 *	...
	 *
	 *	@return {undefined}
	 */
	CompareWidgetResult.prototype.append = function(data) {
		disposeChildren(_parent);
		appendHead();
		appendBody(data);
		_parent.appendChild(_table);
		createRemoveButton();
	}

	/**
	 *	...
	 *
	 *	@return {undefined}
	 */
	CompareWidgetResult.prototype.remove = function(loading) {
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
	 *	...
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
	 *	...
	 *
	 *	@return {undefined}
	 */
	function appendHead() {
		var town = document.getElementById("compare-town");
			town = town.value || town.placeholder;

		appendRow("th", "Växjö", town);
	}

	/**
	 *	...
	 *
	 *	@return {undefined}
	 */
	function appendBody(data) {
		appendRow("td", validateResult(data.vxuText), validateResult(data.townText));
	}

	/**
	 *	...
	 *
	 *	@return {undefined}
	 */
	function appendRow(type, a, b) {
		var tr = document.createElement("tr");

		var ta = document.createElement(type);
			ta.innerHTML = a;

		var tb = document.createElement(type);
			tb.innerHTML = b;

		tr.appendChild(ta);
		tr.appendChild(tb);

		_table.appendChild(tr);
	}

	/**
	 *	...
	 *
	 *	@return {undefined}
	 */
	function validateResult(data) {
		if (data == undefined) {
			data = "No available weather information found during search."
		}

		return data;
	}

	/**
	 *	...
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
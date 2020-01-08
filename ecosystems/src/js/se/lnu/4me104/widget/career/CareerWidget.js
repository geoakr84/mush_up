//--------------------------------------------------------------------------
// Public class
//--------------------------------------------------------------------------

/**
 *  ...
 *
 *  @version    1.0
 *  @copyright  Copyright (c) 2012-2015.
 *  @license    Creative Commons (BY-NC-SA)
 *  @since      Nov 16, 2015
 *  @author     Henrik Andersen <henrik.andersen@lnu.se>
 */
CareerWidget = (function(target) {

    //----------------------------------------------------------------------
    // Strict mode
    //----------------------------------------------------------------------

    "use strict";

    //----------------------------------------------------------------------
    // Default parameters
    //----------------------------------------------------------------------

    /**
     *  append graphical representation on body if no target is specified.
     */
    (target = document.getElementById("career_div"));

    //----------------------------------------------------------------------
    // Private properties
    //----------------------------------------------------------------------

    /**
     *  ...
     *
     *  @default {CareerWidget}
     */
    var _this = this;

    /**
     *  Input element for search string
     *
     *  @default {undefined}
     */
    var _input = undefined;

    /**
     *  ...
     *
     *  @default {undefined}
     */
    var _results = undefined;

    //----------------------------------------------------------------------
    // Public properties
    //----------------------------------------------------------------------

    /**
     *  DOMElement that represents this object
     *
     *  @default {undefined}
     */
    this.element = undefined;

    //----------------------------------------------------------------------
    // Constructor method
    //----------------------------------------------------------------------

    /**
     *  Class constructor
     *
     *  @return {undefined}
     */
    function init() {
    	initElement();
    	initUI();
    }

    //----------------------------------------------------------------------
    // Private methods
    //----------------------------------------------------------------------

    /**
     *  Create the DOM element with the associated CSS style
     *
     *  @return {undefined}
     */
    function initElement() {
    	_this.element = document.createElement("div");
    	_this.element.style.backgroundColor = "rgba(255, 255, 255, 0.85)";
    	_this.element.style.border = "1px solid #DBDBDB";
    	_this.element.style.padding = "25px";
    	_this.element.style.marginBottom = "25px";
    	_this.element.width = "200px";
    	_this.element.height = "200px";

    	target.appendChild(_this.element);
    }

    /**
     *  ...
     *
     *  @return {undefined}
     */
    function initUI() {
    	initUIHeader();
    	initUITitle();
    	initUIButton();
    }

    /**
     *  ...
     *
     *  @return {undefined}
     */
    function initUIHeader() {
    	_this.element.appendChild(getElement("h2", "Looking for a job in Växjö?"));
    	_this.element.appendChild(getElement("p",  "We help you to search for jobs in Vaxjo. Enter a job title, and click on the search button to find your dream job."));
    	_this.element.appendChild(document.createElement("hr"));
    }

    /**
     *  ...
     *
     *  @return {undefined}
     */
    function initUITitle() {
    	_input = document.createElement("input");
    	_input.setAttribute("placeholder", "Web developer");
    	_input.style.padding = "10px 5px";
    	_input.style.width = "100%";

    	_this.element.appendChild(_input);
    }

    /**
     *  ...
     *
     *  @return {undefined}
     */
    function initUIButton() {
    	var button = getElement("button", "Search");
    		button.onclick = onSearch;

    	_this.element.appendChild(button);
    }

    /**
     *  ...
     *
     *  @return {undefined}
     */
    function onSearch() {
    	var title = _input.value || _input.placeholder;
    	$.get("src/php/CareerService.php?title="+title, onSearchComplete);
    }

    /**
     *  ...
     *
     *  @return {undefined}
     */
    function onSearchComplete(data) {
    	data = JSON.parse(data);
    	displayResults(data);
    }

    /**
     *  ...
     *
     *  @return {undefined}
     */
    function displayResults(data) {
    	if (_results !== undefined) {
    		_results.dispose();
    		_results = null;
    	}

    	_results = new CareerWidgetResult(data);
    	_this.element.appendChild(_results.element);
    }

    /**
     *  ...
     *
     *	@param {String}	type	...
     *	@param {String}	value	...
     *
     *  @return {undefined}
     */
    function getElement(type, value) {
    	var element = document.createElement(type);
    		element.innerHTML = value;

    	return element;
    }

    //----------------------------------------------------------------------
    // ...
    //----------------------------------------------------------------------

    init();
});
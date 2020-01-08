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
CareerWidgetResult = (function(data) {

    //----------------------------------------------------------------------
    // Strict mode
    //----------------------------------------------------------------------

    "use strict";

    //----------------------------------------------------------------------
    // Private properties
    //----------------------------------------------------------------------

    /**
     *  ...
     *
     *  @default {CareerWidgetResult}
     */
    var _this = this;

    /**
     *  ...
     *
     *  @default {DOMElement}
     */
    var _table = this;

    //----------------------------------------------------------------------
    // Public properties
    //----------------------------------------------------------------------

    /**
     *  ...
     *
     *  @default {undefined}
     */
    this.element = undefined;

    //----------------------------------------------------------------------
    // Constructor method
    //----------------------------------------------------------------------

    /**
     *  ...
     *
     *  @return {undefined}
     */
    function init() {
        initElement();
        initData();
    }

    //----------------------------------------------------------------------
    // Public methods
    //----------------------------------------------------------------------

    /**
     *  ...
     *
     *  @return {undefined}
     */
    this.dispose = function() {
        if (this.element !== undefined && this.element.parentNode != undefined) {
            this.element.parentNode.removeChild(this.element);
            this.element = null;
        }
    }

    //----------------------------------------------------------------------
    // Private methods
    //----------------------------------------------------------------------

    /**
     *  ...
     *
     *  @return {undefined}
     */
    function initElement() {
        _this.element = document.createElement("div");
        _this.element.style.marginTop = "20px";
    }

    /**
     *  ...
     *
     *  @return {undefined}
     */
    function initData() {
        if (data.hits > 0) getData();
        else getNoData();
    }

    /**
     *  ...
     *
     *  @return {undefined}
     */
    function getData() {
        for (var i = 0; i < data.jobs.length; i++) {
            var c = data.jobs[i].company;
            var t = data.jobs[i].title;
            var d = data.jobs[i].description;
            var l = data.jobs[i].url;

            _this.element.appendChild(getResultElement(c, t, d, l));
        }
    }

    /**
     *  Create design template for "no results found".
     *
     *  @return {undefined}
     */
    function getNoData() {
        var h3 = document.createElement("h3");
            h3.innerHTML = "No job listing found...";
            h3.style.marginBottom = "15px";

        var p = document.createElement("p");
            p.innerHTML = "Try a different job title and see if you have better luck.";

        _this.element.appendChild(h3);
        _this.element.appendChild(p);
    }

    /**
     *  Creates an HTML element that represents a search result, i.e. a job.
     *
     *  @param {String} company     Company name
     *  @param {String} title       Job title
     *  @param {String} description Job description
     *  @param {String} link        Website link
     *
     *  @return {DOMElement}
     */
    function getResultElement(company, title, description, link) {
        //@TODO: FIX THIS METHOD
        var wrapper = document.createElement("a");
            wrapper.style.display = "block";
            wrapper.style.fontStyle = "none";
            wrapper.style.textDecoration = "none";
            wrapper.setAttribute("href", link);
            wrapper.setAttribute("target", "_blank");
            wrapper.style.marginBottom = "20px";

        var h3 = document.createElement("h3");
            h3.innerHTML = company;

        var h4 = document.createElement("h4");
            h4.style.marginTop = "5px";
            h4.style.marginBottom = "10px";
            h4.style.fontStyle = "italic";
            h4.innerHTML = title;

        var p = document.createElement("p");
            p.innerHTML = description;

        wrapper.appendChild(h3);
        wrapper.appendChild(h4);
        wrapper.appendChild(p);

        return wrapper;
    }

    //----------------------------------------------------------------------
    // ...
    //----------------------------------------------------------------------

    init();
});
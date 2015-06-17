define([
    // dojo
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/Stateful",
    "dojo/dom",
    "dojo/dom-construct",
    "dojo/dom-class",
    "dojo/dom-attr",
    "dojo/query",
    "dojo/on",
    "dojo/keys",
    "dojo/text!../templates/GooglePlaceSelection.html",

    // dijit
    "dijit/_Widget",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",

    // epi
    "epi/epi",

    // styles
    "xstyle/css!../styles/GooglePlaceSelection.css",
    "xstyle/css!../styles/font-awesome.min.css"
],
function (
    declare,
    lang,
    Stateful,
    dom,
    domConstruct,
    domClass,
    domAttr,
    query,
    on,
    keys,
    template,

    _Widget,
    _TemplatedMixin,
    _WidgetsInTemplateMixin,

    epi
) {
    return declare("geta-epi-cms.editors.GooglePlaceSelection", [_Widget, _TemplatedMixin, _WidgetsInTemplateMixin, Stateful], {
        templateString: template,
        mapNode: null,
        searchFieldNode: null,
        mapOptions: null,
        map: null,
        placesAutoComplete: null,
        placeMarker: null,
        value: null,
        isMapInitialized: false,
        currentPlace: null,

        postCreate: function () {
            this.inherited(arguments);
            this.mapNode = query(".geta-map-canvas", this.stateNode)[0];
            this.searchFieldNode = query(".geta-place-search-field", this.stateNode)[0];
            this.hookupEvents();
            this.watch("currentPlace", lang.hitch(this, this.onCurrentPlaceChanged));
        },

        postMixInProperties: function () {
            this.inherited(arguments);
        },

        loadGoogleScripts: function () {
            if (dom.byId("geta-gmaps-script")) {
                this.initializeMap();
                return;
            }

            window.getaMapInitialize = lang.hitch(this, this.initializeMap);
            var script = domConstruct.create("script");
            script.id = "geta-gmaps-script";
            script.src = '//maps.googleapis.com/maps/api/js?v3.exp&libraries=places&callback=getaMapInitialize';
            document.body.appendChild(script);
        },

        initializeMap: function () {
            if (this.isMapInitialized) {
                return;
            }

            this.mapOptions = {
                zoom: 0,
                center: new google.maps.LatLng(0, 0)
            };

            this.map = new google.maps.Map(this.mapNode, this.mapOptions);
            this.placesAutoComplete = new google.maps.places.Autocomplete(this.searchFieldNode);

            google.maps.event.addListener(this.placesAutoComplete, "place_changed", lang.hitch(this, this.onPlaceChanged));

            if (this.value) {
                this.searchFieldNode.value = this.value.address;
                this.lat.set("value", this.value.latitude);
                this.lon.set("value", this.value.longitude);
                this.setMapPosition(new google.maps.LatLng(this.value.latitude, this.value.longitude));
            }

            setTimeout(lang.hitch(this, this.alignMap), 250);
            this.isMapInitialized = true;
        },

        alignMap: function () {
            var center = this.map.getCenter();
            google.maps.event.trigger(this.map, "resize");
            this.map.setCenter(center);
        },

        hookupEvents: function () {
            on(this.searchFieldNode, "keydown", lang.hitch(this, this.onSearchFieldKeyDown));
        },

        setMapPosition: function (latLng) {
            if (this.placeMarker) {
                this.placeMarker.setMap(null);
                delete (this.placeMarker);
            }

            this.placeMarker = new google.maps.Marker({
                map: this.map,
                position: latLng
            });

            this.map.setCenter(latLng);
            this.map.setZoom(15);
        },

        clear: function () {
            this.resetMap();
            this.currentPlace = null;
            this._updateValue();
        },

        resetMap: function() {
            this.searchFieldNode.value = '';
            this.map.setCenter(new google.maps.LatLng(0, 0));
        },

        destroy: function() {
            this.inherited(arguments);
        },

        _currentPlaceGetter: function() {
            return this.currentPlace;
        },

        _currentPlaceSetter: function(value) {
            this.currentPlace = value;
        },

        _setValueAttr: function(value) {
            this.inherited(arguments);
            this._set("value", value);

            if (!this.isMapInitialized) {
                this.loadGoogleScripts();
            }
        },

        _updateValue: function () {
            var value = this.currentPlace != null ? {
                placeId: this.currentPlace.place_id,
                address: this.currentPlace.formatted_address,
                latitude: this.currentPlace.geometry.location.A,
                longitude: this.currentPlace.geometry.location.F
            } : null;

            if (this._started && epi.areEqual(this.value, value)) {
                return;
            }

            this._set("value", value);
            this.onChange(value);
        },

        // Events
        onPlaceChanged: function () {
            var place = this.placesAutoComplete.getPlace();

            if (place && place.geometry && place.geometry.location) {
                this.set("currentPlace", place);
                this.setMapPosition(place.geometry.location);
                this.lat.set("value", place.geometry.location.A);
                this.lon.set("value", place.geometry.location.F);
                this._updateValue();
            }
        },

        onCurrentPlaceChanged: function(name, oldValue, value) {
        },

        onSearchFieldKeyDown: function(e) {
            if (e.keyCode == keys.ENTER) {
                e.preventDefault();
                e.stopPropagation();
            }
        },

        onLatLonChanged: function () {
            if (this.lat.value && this.lon.value) {
                this.setMapPosition(new google.maps.LatLng(this.lat.value, this.lon.value));
                this._updateValue();
            }
        }
    });
});
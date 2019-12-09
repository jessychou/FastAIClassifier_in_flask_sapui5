sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"mma/Meeting_Minutes_Assistant/model/models",
	"mma/Meeting_Minutes_Assistant/controller/Error_handler"
], function (UIComponent, Device, models, ErrorHandler) {
	"use strict";

	return UIComponent.extend("mma.Meeting_Minutes_Assistant.Component", {

		metadata: {
			manifest: "json"
		},
		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * In this method, the device models are set and the router is initialized.
		 * @public
		 * @override
		 */
		init: function () {
			this._oErrorHandler = new ErrorHandler(this);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			// call the base component's init function and create the App view
			UIComponent.prototype.init.apply(this, arguments);

			// create the views based on the url/hash
			this.getRouter().initialize();

			/* Mobile Usage Reporting */
			/* Version v3 */
			sap.git = sap.git || {}, sap.git.usage = sap.git.usage || {}, sap.git.usage.Reporting = { _lp: null, _load: function (a) { this._lp = this._lp || sap.ui.getCore().loadLibrary("sap.git.usage", { url: "https://trackingshallwe.hana.ondemand.com/web-client/v3", async: !0 }), this._lp.then(function () { a(sap.git.usage.MobileUsageReporting) }, this._loadFailed) }, _loadFailed: function (a) { jQuery.sap.log.warning("[sap.git.usage.MobileUsageReporting]", "Loading failed: " + a) }, setup: function (a) { this._load(function (b) { b.setup(a) }) }, addEvent: function (a, b) { this._load(function (c) { c.addEvent(a, b) }) }, setUser: function (a, b) { this._load(function (c) { c.setUser(a, b) }) } };

			sap.git.usage.Reporting.setup(this);
		},

		/**
		 * The component is destroyed by UI5 automatically.
		 * In this method, the ListSelector and ErrorHandler are destroyed.
		 * @public
		 * @override
		 */
		destroy: function () {
			this._oErrorHandler.destroy();
			// call the base component's destroy function
			UIComponent.prototype.destroy.apply(this, arguments);
		},

		/**
		 * This method can be called to determine whether the sapUiSizeCompact or sapUiSizeCozy
		 * design mode class should be set, which influences the size appearance of some controls.
		 * @public
		 * @return {string} css class, either 'sapUiSizeCompact' or 'sapUiSizeCozy' - or an empty string if no css class should be set
		 */
		getContentDensityClass: function () {
			if (this._sContentDensityClass === undefined) {
				// check whether FLP has already set the content density class; do nothing in this case
				if (document.body.classList.contains("sapUiSizeCozy") || document.body.classList.contains("sapUiSizeCompact")) {
					this._sContentDensityClass = "";
				} else if (!Device.support.touch) { // apply "compact" mode if touch is not supported
					this._sContentDensityClass = "sapUiSizeCompact";
				} else {
					// "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
		}
	});
});
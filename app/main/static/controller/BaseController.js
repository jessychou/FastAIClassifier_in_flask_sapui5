sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/ui/core/routing/History"
], function (Controller, UIComponent, History) {
	"use strict";

	return Controller.extend("mma.Meeting_Minutes_Assistant.controller.BaseController", {

		getRouter: function () {
			return UIComponent.getRouterFor(this);
		},

		getResourceBundle: function () {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},

		navBack: function (oEvt) {
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				history.go(-1);
			} else {
				this.getRouter().navTo("audioFile_Upload", {}, false);
			}
		},

		getModel: function (sName) {
			return this.getView().getModel(sName);
		},

		setModel: function (oModel, sName) {
			return this.getView().setModel(oModel, sName);
		}
	});
});
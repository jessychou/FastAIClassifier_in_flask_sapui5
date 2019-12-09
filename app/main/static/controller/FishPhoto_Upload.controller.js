sap.ui.define([
	"jquery.sap.storage",
	"sap/ui/model/Filter",
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/m/UploadCollectionParameter",
	"sap/m/TextArea",
	"sap/m/Label",
	"sap/m/Dialog",
	"sap/m/Text",
	"sap/m/Button",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/ui/core/Fragment",
	"mma/Meeting_Minutes_Assistant/model/CommonUtils",
	 "jquery.sap.global",
	"sap/m/library",

], function (jQuery, Filter, Controller, UIComponent, UploadCollectionParameter, TextArea, Label, Dialog, Text, Button, JSONModel, MessageToast, Fragment, CommonUtils, mobileLibrary) {
	"use strict";

	 var storageType = jQuery.sap.storage.Type.local;
	 var storage = jQuery.sap.storage(storageType);

	return Controller.extend("mma.Meeting_Minutes_Assistant.controller.FishPhoto_Upload", {

        onInit: function(){
            var loading_flex = this.getView().byId('loading_flex');
            if(loading_flex.getVisible()){
                loading_flex.setVisible(false);
            }
        },
		_onFileUploaderTypeMissmatch: function (oEvent) {
			var aFileTypes = oEvent.getSource().getFileType();
			jQuery.each(aFileTypes, function (key, value) {
				aFileTypes[key] = "*." + value;
			});
			var sSupportedFileTypes = aFileTypes.join(", ");
			MessageToast.show("The file type *." + oEvent.getParameter("fileType") +
				" is not supported. Choose one of the following types: " +
				sSupportedFileTypes);
		},

		_onFileUploaderChange: function (oEvent) {

			var that = this;
            var loading_flex = this.getView().byId('loading_flex');
            var oFileUploader = this.getView().byId("kkfileUploader");
			oFileUploader.setVisible(false);
            if(!loading_flex.getVisible()){
                loading_flex.setVisible(true);
            }

            var oFile = oEvent.getParameter("files") && oEvent.getParameter("files")[0];
			var oView = this.getView();
			var oFileUploader = this.getView().byId("fileUploader");
			jQuery.sap.domById(oFileUploader.getId() + "-fu").setAttribute("type", "file");
			var file = jQuery.sap.domById(oFileUploader.getId() + "-fu").files[0];
			var oEventSource = oEvent.getSource();
			var oformData = new FormData();
			oformData.append("image_file", file);
			console.log("filename is==========");
			console.log(file.name);

            //ToDO: add back for production
			CommonUtils.jQueryPost_jobid({
				path: '/nlp/image/',
				type: 'POST',
				formData: oformData
				}, function(error, data){
				    console.log("response from api is==============");
				    console.log(data);
				    var photo = new sap.m.Image({
                        width: "100%",
                        src: "resources/" + file.name
                    });
                    var text = new sap.m.Title({
                        text: data.category + ' ' + data.prob
                    })
                    var box = that.getView().byId("image_flex");
                    loading_flex.setVisible(false);
                    box.insertItem(photo, 1);
                    box.insertItem(text, 0);
				});

	},


	});
});
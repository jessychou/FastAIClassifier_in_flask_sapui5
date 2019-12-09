sap.ui.define([
    "sap/m/MessageBox",
	"sap/ui/model/json/JSONModel",
	"mma/Meeting_Minutes_Assistant/model/CommonUtils",
	"sap/m/Dialog",
	"sap/m/Button"
], function (MessageBox, JSONModel, CommonUtils, Dialog, Button) {
    "use strict";

    return {

        postOnMainThread: function(func) {
            // Although there is only 1 thread in JavaScript,
            // but to normalize calling stack for sync calling,
            // postOnMainThread is recommended
            if (Object.prototype.toString.call(func) !== '[object Function]') {
                console.error('postOnMainThread requires argument 1 to be a Function but ' + Object.prototype.toString.call(func) + ' got. Action aborted.');
                return;
            }
            setTimeout(func, 0);
        },

        errorHandler: function(message, error) {
            console.error(message, error);
            var dialog = new sap.m.Dialog({
                title: 'Fatal Error',
                type: 'Message',
                state: 'Error',
                content: new sap.m.Text({ text: message + '\n\n' + error }),
                beginButton: new sap.m.Button({
                    text: 'Ok',
                    press: function () {
                        dialog.close();
                    }
                }),
                afterClose: function () {
                    dialog.destroy();
                }
            });
            dialog.open();
        },

        cancel_errorHandler: function(message, error) {
            console.error(message, error);
            var dialog = new sap.m.Dialog({
                title: 'Cancelled',
                type: 'Message',
                state: 'Error',
                content: new sap.m.Text({ text: message + '\n\n' + error }),
                beginButton: new sap.m.Button({
                    text: 'Ok',
                    press: function () {
                        dialog.close();
                    }
                }),
                afterClose: function () {
                    dialog.destroy();
                }
            });
            dialog.open();
        },

        // fetchCsrfToken: function(callback) {
        //     var that = this;
        //     $.ajax({
        //         url: '/web/api/v1/csrf',
        //         type: 'HEAD',
        //         headers: { 'x-csrf-token': 'fetch' }
        //     }).done(function (message, text, jqXHR) {
        //         that.postOnMainThread(function () {
        //             callback(null, jqXHR.getResponseHeader('x-csrf-token'));
        //         });
        //     })
        //     .fail(function (jqXHR, textStatus, errorThrown) {
        //         that.postOnMainThread(function () {
        //             callback(errorThrown);
        //         });
        //     });
        // },

        // jQueryPost4         : function(options) {
        //     return  $.ajax({
        //          url: options.path,
        //          type: options.type,
        //          data: JSON.stringify(options.json),
        //          contentType: 'application/json'
        //          // contentType: 'multipart/form-data'
        //     });
        //  },

        // jQueryPost2: function(options, callback) {
        // 	var that = this;
        //     return  $.ajax({
        //         url: options.path,
        //         type: options.type,
        //         data: options.formData,
        //         contentType: false,
        //         processData: false
        //     }).done(function (oData)
         
     
        jQueryPost_jobid: function(options, callback) {
        	var that = this;
            return  $.ajax({
                url: options.path,
                type: options.type,
                data: options.formData,
                contentType: false,
                processData: false
            }).done(function (oData) {
				// that._dialog.close();	
            	var data = oData;
            	try {
                    var job_ID = data;
                    console.log(job_ID)
                	// var oModel_meetingid = new sap.ui.model.json.JSONModel({rows : data});
					// sap.ui.getCore().setModel(oModel_meetingid, "Model_meetingid");
					// var Model_meetingid = sap.ui.getCore().getModel("Model_meetingid").getProperty("/rows/meeting_id");
					// console.log(Model_meetingid)
                } catch (e) {
                    that.postOnMainThread(function () {
                        callback(e);
                    });
                    return;
                }
                that.postOnMainThread(function () {
                    callback(null, job_ID);
                });
            }).fail(function (jqXHR, textStatus, errorThrown) {
                that.postOnMainThread(function () {
                    callback(errorThrown);
                });
            });
        },
        

        
       jQueryPost: function(options, callback) {
       		var that = this;
            return  $.ajax({
                url: options.path,
                type: options.type,
                data: JSON.stringify(options.json),
                contentType: 'application/json'
                // contentType: 'multipart/form-data'
           }).done(function (oData) {
        	 	var data = oData;
            	try {
	                var fulltranscriptdata = data;
	                console.log("updating function response",fulltranscriptdata)
                } catch (e) {
                    that.postOnMainThread(function () {
                        callback(e);
                    });
                    return;
                }
                that.postOnMainThread(function () {
                    callback(null, fulltranscriptdata);
                });
            }).fail(function (jqXHR, textStatus, errorThrown) {
                that.postOnMainThread(function () {
                    callback(errorThrown);
                });
            });
        },

        jQueryPost_nlp: function(options, callback) {
            var that = this;
         return  $.ajax({
             url: options.path,
             type: options.type,
             data: JSON.stringify(options.json),
             contentType: 'application/json'
             // contentType: 'multipart/form-data'
        }).done(function (oData) {
              var data = oData;
             try {
                 var fulltranscriptdata = data;
                 console.log("nlp function response",fulltranscriptdata)
             } catch (e) {
                 that.postOnMainThread(function () {
                     callback(e);
                 });
                 return;
             }
             that.postOnMainThread(function () {
                 callback(null, fulltranscriptdata);
             });
         }).fail(function (jqXHR, textStatus, errorThrown) {
             that.postOnMainThread(function () {
                 callback(errorThrown);
             });
         });
     },
        
       jQueryPost3: function(options, callback) {
           return  $.ajax({
                url: options.path,
                type: options.type,
                data: JSON.stringify(options.json),
                contentType: 'application/json'
                // contentType: 'multipart/form-data'
           }).done(function (oData) {
           	// var data = oData.actions;
			// console.log("inside transcript function")
			// // console.log(oData)
            // console.log(data)
            // // data = data.replace(/I'm/g, 'Izm')
            // data = data.replace(/'/g, '"')
            // data = data.replace(/(\w+)"(\w+)/g, '$1\'$2');
            // // data = data.replace(/Izm/g, 'I\'m')
            // data= JSON.parse(data)
			// // console.log(test);
			// // data = JSON.parse(data.replace(/'/g, '"'))
			// var jsondata = data.nlp_result.transcript
            // var oModel_transcript = new sap.ui.model.json.JSONModel({transcript : jsondata});
            // var test = oModel_transcript

            // sap.ui.getCore().setModel(test, "test");
			// sap.ui.getCore().setModel(oModel_transcript, "Model_transcript");
            // console.log(oModel_transcript)

            var that= this;
            var fulltranscriptdata = oData.actions;

            // fulltranscriptdata = fulltranscriptdata.replace(/I'm/g, 'Izm')
            fulltranscriptdata = fulltranscriptdata.replace(/'/g, '"');
            // fulltranscriptdata = fulltranscriptdata.replace(/Izm/g, 'I\'m')
            fulltranscriptdata = fulltranscriptdata.replace(/(\w+)"(\w+)/g, '$1\'$2');
            fulltranscriptdata= JSON.parse(fulltranscriptdata)

			var oModel_fulltranscriptdata = new sap.ui.model.json.JSONModel({rows : fulltranscriptdata});
			// this.getView().setModel(oModel_fulltranscriptdata, "oModel_fulltranscriptdata");

			var data = oData.actions
			console.log("inside transcript function")
			// console.log(oData)
			console.log(data)
			// console.log(test);
            // data = JSON.parse(data.replace(/'/g, '"'))
            // data = data.replace(/I'm/g, 'Izm')
            data = data.replace(/'/g, '"');
            // data = data.replace(/Izm/g, 'I\'m')
            data = data.replace(/(\w+)"(\w+)/g, '$1\'$2');
            data= JSON.parse(data);

            var stt_transcript = []
            for(var i = 0; i < data.transcript.length; i++) {
                if (data.transcript[i].results) {
                    var jsondata =  data.transcript[i].results  
                    console.log("jsondata",jsondata)
                    for (var j = 0; j < jsondata.length; j++){
                    var trans = jsondata[j].alternatives[0].transcript
                    stt_transcript.push({confidence:'', transcript: trans, words: ''})           
                    }
                }
            }
            console.log({transcript:stt_transcript})
            var oModel_transcript = new sap.ui.model.json.JSONModel({transcript : stt_transcript});
            // var test = oModel_transcript
			// var jsondata = data.transcript.results.alternatives.transcript
			// console.log(jsondata)
			// // console.log(typeof(jsondata))
			// var oModel_transcript = new sap.ui.model.json.JSONModel({transcript : jsondata});
            // sap.ui.getCore().setModel(oModel_transcript, "Model_transcript");
            sap.ui.getCore().setModel(oModel_transcript, "Model_transcript_undoredo");
			// sap.ui.getCore().setModel(test, "test");
			// console.log(test)
        	// var undoRedoComponent = Undoredo.undoRedo(test);
	        // console.log("undoredocomponent",undoRedoComponent);
        	// var oModel_undoredo = new sap.ui.model.json.JSONModel(undoRedoComponent);
			// sap.ui.getCore().setModel(oModel_undoredo, "Model_undoredo");

	  //      var oModel_currentvalue = new sap.ui.model.json.JSONModel(oCurrentValue);
			// sap.ui.getCore().setModel(oModel_currentvalue, "Model_currentValue");
			callback();
           	
           });
        },
        
		jQueryPost4 : function(options, callback) {
           return  $.ajax({
                url: options.path,
                type: options.type,
                data: JSON.stringify(options.json),
                contentType: 'application/json'
                // contentType: 'multipart/form-data'
           });
        },

        
   //   	_getmeeting_id: function (oData) {
   // 		var data = oData
			// console.log(data);
			// // data = JSON.parse(data.replace(/'/g, '"'))
			// var oModel_meetingid = new sap.ui.model.json.JSONModel({rows : data})
			// sap.ui.getCore().setModel(oModel_meetingid, "Model_meetingid");
			// },
			
        
    	_getdata_actions: function (oData) {
            var fulldata = oData.actions;
            // fulldata = fulldata.replace(/I'm/g, 'Izm')
            fulldata = fulldata.replace(/'/g, '"')
            // fulldata = fulldata.replace(/Izm/g, 'I\'m')
            fulldata = fulldata.replace(/(\w+)"(\w+)/g, '$1\'$2');
            fulldata= JSON.parse(fulldata)

			var oModel_fulldata = new sap.ui.model.json.JSONModel({rows : fulldata});
			this.getView().setModel(oModel_fulldata, "oModel_fulldata");
    		
			var data = oData.actions;
			
			// console.log(data);
            // data = JSON.parse(data.replace(/'/g, '"'))
            // data = data.replace(/I'm/g, 'Izm')
            data = data.replace(/'/g, '"');
            data = data.replace(/(\w+)"(\w+)/g, '$1\'$2');
            // data = data.replace(/Izm/g, 'I\'m')
            data= JSON.parse(data)
			var jsondata = data.nlp_result.actions;
			// console.log(jsondata)
            // console.log(typeof(jsondata))

            var oModel_multiinput = sap.ui.getCore().getModel("Model_multiinput");
            console.log(oModel_multiinput.oData.rows);
            var pname = '';
            // for(var j = 0; j < oModel_multiinput.oData.rows.length; j++) {
            //     var pnm = oModel_multiinput.oData.rows[j].pname
            //     pname.push({pnm:pnm})           
            //     }       
            // console.log(pname);
            var participant_action = [];
            for(var i = 0; i < jsondata.length; i++) {
                var name = jsondata[i].name
                var incharge = jsondata[i].incharge
                var duedate = jsondata[i].duedate
                participant_action.push({name:name, incharge: incharge, duedate: duedate, pname: pname})           
                }       
            console.log({actions:participant_action})
			var oModel_actions = new sap.ui.model.json.JSONModel({actions : participant_action});
        	// var oModel_actions = new sap.ui.model.json.JSONModel({actions : jsondata});
			this.getView().setModel(oModel_actions, "Model_actions");
			// sap.ui.getCore().setModel(oModel_actions, "Model_tasksummary");
			console.log(oModel_actions)
        },

        _getdata_actions_keynotes: function (oData) {
            console.log(oData)
            var fulldata = oData.actions;
            // fulldata = fulldata.replace(/I'm/g, 'Izm')
            fulldata = fulldata.replace(/'/g, '"')
            // fulldata = fulldata.replace(/Izm/g, 'I\'m')
            fulldata = fulldata.replace(/(\w+)"(\w+)/g, '$1\'$2');
            fulldata= JSON.parse(fulldata)
            console.log(fulldata)
            // var oModel_pname = sap.ui.getCore().getModel("Model_tasksummary");
            // console.log(oModel_pname)
            // oModel_pname = oModel_pname.oData.actions

			var oModel_fulldata = new sap.ui.model.json.JSONModel({rows : fulldata});
			this.getView().setModel(oModel_fulldata, "oModel_fulldata");
    		
			var data = oData.actions;
			
			// console.log(data);
            // data = JSON.parse(data.replace(/'/g, '"'))
            // data = data.replace(/I'm/g, 'Izm')
            data = data.replace(/'/g, '"');
            data = data.replace(/(\w+)"(\w+)/g, '$1\'$2');
            // data = data.replace(/Izm/g, 'I\'m')
            data= JSON.parse(data)
			var jsondata = data.nlp_result.actions;
			// console.log(jsondata)
            // console.log(typeof(jsondata))

            // var pname = [];
            // for(var j = 0; j < oModel_pname.oData.actions.length; j++) {
            //     var pnm = oModel_pname.oData.actions[j]
            //     pname.push(pnm)           
            //     }       
			// console.log(pname);
        //   if(oModel_pname){
        //     var participant_action = [];
        //     for(var i = 0; i < jsondata.length; i++) {
        //         var name = jsondata[i].name
        //         var incharge = jsondata[i].incharge
        //         var duedate = jsondata[i].duedate
        //         var pnm = oModel_pname.oData.actions[i].pname
        //         participant_action.push({name:name, incharge: incharge, duedate: duedate, pname: pnm})           
        //         }       
        //     console.log({actions:participant_action})
          
        //     var oModel_actions = new sap.ui.model.json.JSONModel({actions : participant_action});
        //     }

        	var oModel_actions = new sap.ui.model.json.JSONModel({actions : jsondata});
			this.getView().setModel(oModel_actions, "Model_actions");
			// sap.ui.getCore().setModel(oModel_actions, "Model_tasksummary");
			console.log(oModel_actions)
        },

        _getdata_actions_tasks: function (oData) {
            var fulldata = oData.actions;
            // fulldata = fulldata.replace(/I'm/g, 'Izm')
            fulldata = fulldata.replace(/'/g, '"')
            // fulldata = fulldata.replace(/Izm/g, 'I\'m')
            fulldata = fulldata.replace(/(\w+)"(\w+)/g, '$1\'$2');
            fulldata= JSON.parse(fulldata)

			var oModel_fulldata = new sap.ui.model.json.JSONModel({rows : fulldata});
			this.getView().setModel(oModel_fulldata, "oModel_fulldata");
    		
			var data = oData.actions;
			
			// console.log(data);
            // data = JSON.parse(data.replace(/'/g, '"'))
            // data = data.replace(/I'm/g, 'Izm')
            data = data.replace(/'/g, '"');
            data = data.replace(/(\w+)"(\w+)/g, '$1\'$2');
            // data = data.replace(/Izm/g, 'I\'m')
            data= JSON.parse(data)
			var jsondata = data.nlp_result.actions;
			// console.log(jsondata)
            // console.log(typeof(jsondata))

        	var oModel_actions = new sap.ui.model.json.JSONModel({actions : jsondata});
			this.getView().setModel(oModel_actions, "Model_actions");
			// sap.ui.getCore().setModel(oModel_actions, "Model_tasksummary");
			console.log(oModel_actions)
        },
        
        _getjob_status: function(job_ID, callback) {
            var that = this;
            var job_ID = job_ID;
            that.jQueryPost({
//                path: '/api/rpc/status/' + job_ID,
                path: '/rpc/status/' + job_ID,
                type: 'get'
            }, function(error, odata){
                var data = odata.job_status;
                if (error) {
                    that.postOnMainThread(function () {
                        callback(error);
                    });
                    return;
                }
                if (data === 'RUNNING') {
                    setTimeout(function () {
                        that._getjob_status(job_ID, callback);
                    }, 5000);
                }
                if (data === 'SUCCESS') {
                    var meetingid = odata.result
                    var oModel_meetingid = new sap.ui.model.json.JSONModel({rows : meetingid});
                    sap.ui.getCore().setModel(oModel_meetingid, "Model_meetingid");
                    var Model_meetingid = sap.ui.getCore().getModel("Model_meetingid").getProperty("/rows/meeting_id");
                    that.postOnMainThread(function () {
                        if (callback) {
                            callback(null, meetingid);
                        }
                    });
                        return;
                }
                if (data === 'ERROR') {
                    console.log('inside error msg ');
                    var errorMessage = odata.message;
                    that.postOnMainThread(function () {
                        callback(errorMessage);
                    });
                    return;
                }
                
            });
        },

        _getjob_status_nlp: function(job_ID, callback) {
            var that = this;
            var job_ID = job_ID;
            console.log("jobstatus", job_ID)
            that.jQueryPost({
//                path: '/api/rpc/status/' + job_ID,
                path: '/rpc/status/' + job_ID,
                type: 'get'
            }, function(error, odata){
                var data = odata.job_status;
                console.log(data)
                console.log(typeof(data))
                if (error) {
                    console.log('inside error msg ');
                    that.postOnMainThread(function () {
                        callback(error);
                    });
                    return;
                }
                if (data === 'RUNNING') {
                    setTimeout(function () {
                        that._getjob_status_nlp(job_ID, callback);
                    }, 5000);
                }
                if (data === 'SUCCESS') {
                var meetingid = odata.result
                // console.log(meetingid)
                // var oModel_meetingid = new sap.ui.model.json.JSONModel({rows : meetingid});
                // console.log("omodel", oModel_meetingid)
                // sap.ui.getCore().setModel(oModel_meetingid, "Model_meetingid");
                // // console.log(Model_meetingid)
                // var Model_meetingid = sap.ui.getCore().getModel("Model_meetingid").getProperty("/rows/meeting_id");
                // console.log("model", Model_meetingid)
                    that.postOnMainThread(function () {
                        if (callback) {
                            callback(null, meetingid);
                        }
                    });
                    return;
                }
                if (data === 'ERROR') {
                    console.log('inside error msg ');
                    var errorMessage = odata.message;
                    that.postOnMainThread(function () {
                        callback(errorMessage);
                    });
                    return;
                }
                
            });
        },
            
        _getmeeting_ID: function(job_ID, callback) {
            var that = this;
            var job_ID = job_ID;
            that.jQueryPost4({
//                path: '/api/rpc/status/' + job_ID,
                path: '/rpc/status/' + job_ID,
                type: 'get'
            }, function(error, odata){
                var data = odata;
                try {
                	var oModel_meetingid = new sap.ui.model.json.JSONModel({rows : data});
					sap.ui.getCore().setModel(oModel_meetingid, "Model_meetingid");
					var Model_meetingid = sap.ui.getCore().getModel("Model_meetingid").getProperty("/rows/result/meeting_id");
					console.log(Model_meetingid)
                } catch (e) {
                    that.postOnMainThread(function () {
                        callback(e);
                    });
                    return;
                }
                that.postOnMainThread(function () {
                    callback(null, job_ID);
                });
            }).fail(function (jqXHR, textStatus, errorThrown) {
                that.postOnMainThread(function () {
                    callback(errorThrown);
                });
            });
        },

		_getdata_transcript: function (oData) {
			var that= this;
            var fulltranscriptdata = oData.actions;

            // fulltranscriptdata = fulltranscriptdata.replace(/I'm/g, 'Izm')
            fulltranscriptdata = fulltranscriptdata.replace(/'/g, '"');
            // fulltranscriptdata = fulltranscriptdata.replace(/Izm/g, 'I\'m')
            fulltranscriptdata = fulltranscriptdata.replace(/(\w+)"(\w+)/g, '$1\'$2');
            fulltranscriptdata= JSON.parse(fulltranscriptdata)

			var oModel_fulltranscriptdata = new sap.ui.model.json.JSONModel({rows : fulltranscriptdata});
			this.getView().setModel(oModel_fulltranscriptdata, "oModel_fulltranscriptdata");

			var data = oData.actions
            data = data.replace(/'/g, '"');
            // data = data.replace(/Izm/g, 'I\'m')
            data = data.replace(/(\w+)"(\w+)/g, '$1\'$2');
            data= JSON.parse(data);

            var stt_transcript = []
            for(var i = 0; i < data.transcript.length; i++) {
                if (data.transcript[i].results) {
                    var jsondata =  data.transcript[i].results  
                    for (var j = 0; j < jsondata.length; j++){
                    var trans = jsondata[j].alternatives[0].transcript
                    stt_transcript.push({confidence:'', transcript: trans, words: ''})           
                    }
                }
            }
            var oModel_transcript = new sap.ui.model.json.JSONModel({transcript : stt_transcript});
			this.getView().setModel(oModel_transcript, "Model_transcript");

			//add actions to display
			var actions = data.nlp_result[0].actions;
		    var oModel_actions = new sap.ui.model.json.JSONModel({actions: actions});
            this.getView().setModel(oModel_actions, "Model_actions");
			},

		_getdata_transcript2: function (oData) {
			var fulltranscriptdata = oData;
			var oModel_fulltranscriptdata = new sap.ui.model.json.JSONModel({rows : fulltranscriptdata});
			this.getView().setModel(oModel_fulltranscriptdata, "oModel_fulltranscriptdata");
			
            var data = oData.actions
            // data = JSON.parse(data)
			console.log("inside transcript function")
			// console.log(typeof(data))
			// console.log(data)
            // console.log(test);
            // data = data.replace(/I'm/g, 'Izm')
            data = data.replace(/'/g, '"');
            // data = data.replace(/Izm/g, 'I\'m')
            data = data.replace(/(\w+)"(\w+)/g, '$1\'$2');
            data= JSON.parse(data)
            // var jsondata = data
            console.log(data)
            console.log(typeof(data))

      
            
            var stt_transcript = []
            for(var i = 0; i < data.transcript.length; i++) {
                if (data.transcript[i].results) {
                    var jsondata =  data.transcript[i].results  
                    console.log("jsondata",jsondata)
                    for (var j = 0; j < jsondata.length; j++){
                    var trans = jsondata[j].alternatives[0].transcript
                    stt_transcript.push({confidence:'', transcript: trans, words: ''})           
                    }
                }
            }
            console.log({transcript:stt_transcript})
			var oModel_transcript = new sap.ui.model.json.JSONModel({transcript : stt_transcript});
			this.getView().setModel(oModel_transcript, "Model_transcript");
			console.log(oModel_transcript)
			},  
        
		_getdata_delete: function (oData, callback) {
			console.log(oData);
			var dialog = new Dialog({
				title: 'Success',
				type: 'Message',
				state: 'Success',
				content: new Text({ text: 'All Data removed successfully' }),
				beginButton: new Button({
					text: 'Ok',
					press: function () {
						// MessageToast.show('Submit pressed!');
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});

			dialog.open();
			},
			
		_getnlp_loaded: function (oData) {
			var dialog = new Dialog({
				title: 'Status',
				type: 'Message',
				content: new Text({ text: 'Changes Updated successfully!' }),
				beginButton: new Button({
					text: 'Ok',
					press: function () {
						// MessageToast.show('Submit pressed!');
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});

			dialog.open();
			}
        };
});
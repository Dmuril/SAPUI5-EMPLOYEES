//@ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("logaligroup.Employees.controller.MainView", {
            onInit: function () {

            },

            onValidate: function () {
                var inputEmployee = this.byId("inputEmployee");
                var valueEmployee = inputEmployee.getValue();
                var isSix = ( valueEmployee.length === 6 );

                //if (valueEmployee.length === 6) {
                   // inputEmployee.setDescription("OK");
                   this.byId("labelCoutry").setVisible(isSix);
                   this.byId("slCountry").setVisible(isSix);
                //} else {
                //   this.byId("labelCoutry").setVisible(false);
                //this.byId("slCountry").setVisible(false);
                // inputEmployee.setDescription("Not OK");
                //}
            }
        });
    });

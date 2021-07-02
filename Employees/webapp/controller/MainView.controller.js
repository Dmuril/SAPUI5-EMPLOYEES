//@ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator ) {
        "use strict";

        function onInit() {
            var oJSONModel = new sap.ui.model.json.JSONModel();
            var oView = this.getView();
            var i18nBundle = oView.getModel("i18n").getResourceBundle();

            oJSONModel.loadData("./localService/mockdata/Employees.json", false);
            oView.setModel(oJSONModel);
        } 

        function onFilter (){
            var oJSON = this.getView().getModel().getData();

            var filters = [];

            if ( oJSON.EmployeeId !== "" ){
                filters.push( new Filter("EmployeeID", FilterOperator.EQ, oJSON.EmployeeId));
            }

            if ( oJSON.CoutryKey !== "" ){
                filters.push( new Filter("Country", FilterOperator.EQ, oJSON.CountryKey));
            }

            var oList = this.getView().byId("tableEmployee");
            var oBinding = oList.getBinding("items");
            oBinding.filter(filters)

        }

        function onClearFilter (){
            var oModel = this.getView().getModel();
            oModel.setProperty("/EmployeeId", "");
            oModel.setProperty("/CountryKey", "");
        }

        function showPostalCode (oEvent) {

            var itemPressed = oEvent.getSource();
            var oContext = itemPressed.getBindingContext();
            var objectContext = oContext.getObject();

            sap.m.MessageToast.show(objectContext.PostalCode);

        }

        var Main = Controller.extend("logaligroup.Employees.controller.MainView", {});

        Main.prototype.onValidate = function () {
            var inputEmployee = this.byId("inputEmployee");
            var valueEmployee = inputEmployee.getValue();
            var isSix = (valueEmployee.length === 6);

            this.byId("labelCoutry").setVisible(isSix);
            this.byId("slCountry").setVisible(isSix);
        };

        Main.prototype.onInit = onInit;
        Main.prototype.onFilter = onFilter;
        Main.prototype.onClearFilter = onClearFilter;
        Main.prototype.showPostalCode =showPostalCode;

        return Main;
    }
);

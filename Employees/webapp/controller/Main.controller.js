//@ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {

    return Controller.extend("logaligroup.Employees.controller.Main", {

        onInit: function () {
            
            var oView = this.getView();
            // var i18nBundle = oView.getModel("i18n").getResourceBundle();

            var oJSONModelEmpl = new sap.ui.model.json.JSONModel();
            oJSONModelEmpl.loadData("./localService/mockdata/Employees.json", false);
            oView.setModel(oJSONModelEmpl, "jsonEmployees");

            var oJSONModelCountries = new sap.ui.model.json.JSONModel();
            oJSONModelCountries.loadData("./localService/mockdata/Countries.json", false);
            oView.setModel(oJSONModelCountries, "jsonCountries");

            var oJSONModelLayout = new sap.ui.model.json.JSONModel();
            oJSONModelLayout.loadData("./localService/mockdata/Layouts.json", false);
            oView.setModel(oJSONModelLayout, "jsonLayout");

            var oJSONModelConfig = new sap.ui.model.json.JSONModel({
                visibleId: true,
                visibleName: true,
                visibleCountry: true,
                visibleCity: false,
                visibleBtnShowCity: true,
                visibleBtnHideCity: false
            });

            oView.setModel(oJSONModelConfig, "jsonModelConfig");

            this._bus = sap.ui.getCore().getEventBus();

            this._bus.subscribe("flexible", "showEmployee", this.showEmployeeDetails, this);
    
        }, 

        showEmployeeDetails: function (category, nameEnvent, path) {
            var detailView = this.getView().byId("detailEmployeeView");
            detailView.bindElement("jsonEmployees>" + path);
            this.getView().getModel("jsonLayout").setProperty("/ActiveKey", "TwoColumnsMidExpanded");

            var incidenceModel = new sap.ui.model.json.JSONModel([]);
            detailView.setModel(incidenceModel, "incidenceModel" );

            detailView.byId("tableIncidence").removeAllContent();
            
        }
    });
});
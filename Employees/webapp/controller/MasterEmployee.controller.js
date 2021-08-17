//@ts-nocheck
sap.ui.define([
    "logaligroup/Employees/controller/Base.controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Base, Filter, FilterOperator) {
        "use strict";

        function onInit() {
            this._bus = sap.ui.getCore().getEventBus();
        }

        function onFilter() {
            var oJSONCountries = this.getView().getModel("jsonCountries").getData();

            var filters = [];

            if (oJSONCountries.EmployeeId !== "") {
                filters.push(new Filter("EmployeeID", FilterOperator.EQ, oJSONCountries.EmployeeId));
            }

            if (oJSONCountries.CoutryKey !== "") {
                filters.push(new Filter("Country", FilterOperator.EQ, oJSONCountries.CountryKey));
            }

            var oList = this.getView().byId("tableEmployee");
            var oBinding = oList.getBinding("items");
            oBinding.filter(filters)

        }

        function onClearFilter() {
            var oModel = this.getView().getModel("jsonCountries");
            oModel.setProperty("/EmployeeId", "");
            oModel.setProperty("/CountryKey", "");
        }

        function showPostalCode(oEvent) {

            var itemPressed = oEvent.getSource();
            var oContext = itemPressed.getBindingContext("odataNorthwind");
            var objectContext = oContext.getObject();

            sap.m.MessageToast.show(objectContext.PostalCode);

        }

        function onShowCity() {
            var oJSONModelConfig = this.getView().getModel("jsonModelConfig");
            oJSONModelConfig.setProperty("/visibleCity", true);
            oJSONModelConfig.setProperty("/visibleBtnShowCity", false);
            oJSONModelConfig.setProperty("/visibleBtnHideCity", true);

        }

        function onHideCity() {
            var oJSONModelConfig = this.getView().getModel("jsonModelConfig");
            oJSONModelConfig.setProperty("/visibleCity", false);
            oJSONModelConfig.setProperty("/visibleBtnShowCity", true);
            oJSONModelConfig.setProperty("/visibleBtnHideCity", false);
        }

        function showOrders(oEvent) {

            //get selected controller
            var iconPressed = oEvent.getSource();

            var oContext = iconPressed.getBindingContext("odataNorthwind");

            if (!this._oDiaglogOrders) {
                this._oDiaglogOrders = sap.ui.xmlfragment("logaligroup.Employees.fragment.DialogOrders", this);
                this.getView().addDependent(this._oDiaglogOrders);
            }

            this._oDiaglogOrders.bindElement("odataNorthwind>" + oContext.getPath());
            this._oDiaglogOrders.open();

        }

        function onCloseOrders() {
            this._oDiaglogOrders.close();
        };

        function showEmployee(oEvent){
          var path = oEvent.getSource().getBindingContext("odataNorthwind").getPath();
          this._bus.publish("flexible", "showEmployee", path ) ;

        }

    /*    function toOrdersDetails(oEvent){
            var orderId = oEvent.getSource().getBindingContext("odataNorthwind").getObject().OrderID;
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteOrderDetails", {
                OrderID : orderId
            });
        } */

        var Main = Base.extend("logaligroup.Employees.controller.MasterEmployee", {});

    /*    Main.prototype.onValidate = function () {
            var inputEmployee = this.byId("inputEmployee");
            var valueEmployee = inputEmployee.getValue();
            var isSix = (valueEmployee.length === 6);

            this.byId("labelCoutry").setVisible(isSix);
            this.byId("slCountry").setVisible(isSix);
        }; */

        Main.prototype.onInit = onInit;
        Main.prototype.onFilter = onFilter;
        Main.prototype.onClearFilter = onClearFilter;
        Main.prototype.showPostalCode = showPostalCode;
        Main.prototype.onShowCity = onShowCity;
        Main.prototype.onHideCity = onHideCity;
        Main.prototype.showOrders = showOrders;
        Main.prototype.onCloseOrders = onCloseOrders;
        Main.prototype.showEmployee = showEmployee;
     //   Main.prototype.toOrdersDetails = toOrdersDetails;
        return Main;
    }
);

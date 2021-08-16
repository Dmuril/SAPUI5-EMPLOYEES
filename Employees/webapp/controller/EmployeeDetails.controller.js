/* eslint-disable no-undef */
//@ts-nocheck 

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "logaligroup/Employees/model/formatter",
    "sap/m/MessageBox"
], function (Controller, formatter, MessageBox) {


    function onInit() {
        this._bus = sap.ui.getCore().getEventBus();
    };

    function onCreateIncidence() {
        var tableIncidence = this.getView().byId("tableIncidence");
        var newIncidence = sap.ui.xmlfragment("logaligroup.Employees.fragment.NewIncidence", this);
        var incidenceModel = this.getView().getModel("incidenceModel");
        var odata = incidenceModel.getData();
        var index = odata.length;
        odata.push({ index: index + 1, _ValidateDate: false, EnabledSave: false });
        incidenceModel.refresh();
        newIncidence.bindElement("incidenceModel>/" + index);
        tableIncidence.addContent(newIncidence);
    };

    /*
        function onDeleteIncedence(oEvent) {
    
            var tableIncidence = this.getView().byId("tableIncidence");
            var rowIncidence = oEvent.getSource().getParent().getParent();
            var incedenceModel = this.getView().getModel("incidenceModel");
            var odata = incedenceModel.getData();
            var contectObjec = rowIncidence.getBindingContext("incidenceModel");
    
            odata.splice(contectObjec.index - 1, 1);
            for (var i in odata) {
                odata[i].index = parseInt(i) + 1
            }
    
            incedenceModel.refresh();
            tableIncidence.removeContent(rowIncidence);
    
            for (var j in tableIncidence.getContent()) {
                tableIncidence.getContent()[j].bindElement("incidenceModel>/" + j);
            }
        };
    */
    function onDeleteIncidence(oEvent) {

        var contextObjec = oEvent.getSource().getBindingContext("incidenceModel").getObject();
        MessageBox.confirm(this.getView().getModel("i18n").getResourceBundle().getText("confirmDeleteIncidence"), {

            onClose: function (oAction) {

                if (oAction === "OK") {

                    this._bus.publish("incidence", "onDeleteIncidence", {
                        IncidenceId: contextObjec.IncidenceId,
                        SapId: contextObjec.SapId,
                        EmployeeId: contextObjec.EmployeeId,
                    });
                }
            }.bind(this)
        });
    };

    function onSaveIncident(oEvent) {
        var incidence = oEvent.getSource().getParent().getParent();
        var incidenceRow = incidence.getBindingContext("incidenceModel");
        this._bus.publish("incidence", "onSaveIncident", { incidenceRow: incidenceRow.sPath.replace('/', '') })
    }

    function updateIncidenceCreationDate(oEvent) {

        let context = oEvent.getSource().getBindingContext("incidenceModel");
        let contextObjec = context.getObject();
        let oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

        if (!oEvent.getSource().isValidValue()) {
            contextObjec._ValidateDate = false;
            contextObjec.CreationDateState = "Error";

            MessageBox.error(oResourceBundle.getText("errorCreationDateValue"), {
                title: "Error",
                onClose: null,
                styleClass: "",
                actions: MessageBox.Action.Close,
                emphasizedAction: null,
                initialFocus: null,
                textDirection: sap.ui.core.TextDirection.Inherit,
            })

        } else {
            contextObjec.CreationDateX = true;
            contextObjec._ValidateDate = true;
            contextObjec.CreationDateState = "None";
        };

        if (oEvent.getSource().isValidValue() && contextObjec.Reason) {
            contextObjec.EnabledSave = true;
        } else {
            contextObjec.EnabledSave = false;
        }
        context.getModel().refresh();
    }

    function updateIncidenceReason(oEvent) {
        let context = oEvent.getSource().getBindingContext("incidenceModel");
        let contextObjec = context.getObject();

        if (oEvent.getSource().getValue()) {
            contextObjec.ReasonState = "None";
            contextObjec.ReasonX = true;
        } else {
            contextObjec.ReasonState = "Error";
        };

        if (contextObjec._ValidateDate && oEvent.getSource().getValue()) {
            contextObjec.EnabledSave = true;
        } else {
            contextObjec.EnabledSave = false;
        }
        context.getModel().refresh();

    }

    function updateIncidenceType(oEvent) {
        let context = oEvent.getSource().getBindingContext("incidenceModel");
        let contextObjec = context.getObject();
        contextObjec.TypeX = true;
        if (contextObjec._ValidateDate && contextObjec.Reason) {
            contextObjec.EnabledSave = true;
        } else {
            contextObjec.EnabledSave = false;
        }
        context.getModel().refresh();
    }

    function toOrdersDetails(oEvent) {
        var orderId = oEvent.getSource().getBindingContext("odataNorthwind").getObject().OrderID;
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("RouteOrderDetails", {
            OrderID: orderId
        });
    }

    var Main = Controller.extend("logaligroup.Employees.controller.EmployeeDetails", {});

    Main.prototype.onInit = onInit;
    Main.prototype.onCreateIncidence = onCreateIncidence;
    Main.prototype.Formatter = formatter;
    Main.prototype.onDeleteIncidence = onDeleteIncidence;
    Main.prototype.onSaveIncident = onSaveIncident;
    Main.prototype.updateIncidenceCreationDate = updateIncidenceCreationDate;
    Main.prototype.updateIncidenceReason = updateIncidenceReason;
    Main.prototype.updateIncidenceType = updateIncidenceType;
    Main.prototype.toOrdersDetails = toOrdersDetails;
    return Main;

});
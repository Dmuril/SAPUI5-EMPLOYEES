/* eslint-disable no-undef */
//@ts-nocheck 

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "logaligroup/Employees/model/formatter"
], function (Controller, formatter) {


    function onInit() {
        this._bus = sap.ui.getCore().getEventBus();
    };

    function onCreateIncidence() {
        var tableIncidence = this.getView().byId("tableIncidence");
        var newIncidence = sap.ui.xmlfragment("logaligroup.Employees.fragment.NewIncidence", this);
        var incidenceModel = this.getView().getModel("incidenceModel");
        var odata = incidenceModel.getData();
        var index = odata.length;
        odata.push({ index: index + 1 });
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
        this._bus.publish("incidence", "onDeleteIncidence", { 
            IncidenceId : contextObjec.IncidenceId,
            SapId : contextObjec.SapId,
            EmployeeId : contextObjec.EmployeeId,
         });
    };

    function onSaveIncident(oEvent) {
        var incidence = oEvent.getSource().getParent().getParent();
        var incidenceRow = incidence.getBindingContext("incidenceModel");
        this._bus.publish("incidence", "onSaveIncident", { incidenceRow: incidenceRow.sPath.replace('/', '') })
    }

    function updateIncidenceCreationDate(oEvent) {
        var context = oEvent.getSource().getBindingContext("incidenceModel");
        var contextObjec = context.getObject();
        contextObjec.CreationDateX = true;
    }

    function updateIncidenceReason(oEvent) {
        var context = oEvent.getSource().getBindingContext("incidenceModel");
        var contextObjec = context.getObject();
        contextObjec.ReasonX = true;
    }

    function updateIncidenceType(oEvent) {
        var context = oEvent.getSource().getBindingContext("incidenceModel");
        var contextObjec = context.getObject();
        contextObjec.TypeX = true;
    }

    var Main = Controller.extend("logaligroup.Employees.controller.EmployeeDetails", {});

    Main.prototype.onInit = onInit;
    Main.prototype.onCreateIncidence = onCreateIncidence;
    Main.prototype.Formatter = formatter;
    Main.prototype.onDeleteIncedence = onDeleteIncidence;
    Main.prototype.onSaveIncident = onSaveIncident;
    Main.prototype.updateIncidenceCreationDate = updateIncidenceCreationDate;
    Main.prototype.updateIncidenceReason = updateIncidenceReason;
    Main.prototype.updateIncidenceType = updateIncidenceType;
    return Main;

});
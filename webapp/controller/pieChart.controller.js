sap.ui.define([
    'praveen/controller/BaseController',
    "sap/ui/core/routing/History"
], function(BaseController, History) {
    return BaseController.extend("praveen.controller.pieChart",{
        onInit: function(){
            debugger;
            //set the routematch handler function
            this.oRouter = this.getOwnerComponent().getRouter();
            this.getOwnerComponent().getRouter().getRoute("SupplierDetails").attachMatched(this.rmh, this)
        },
        rmh: function(oEvent){
            debugger;
            //Extract the Id from oEvent
            var supplierId = oEvent.getParameter("arguments").supplierId;

            //construct the path 
            var sPath = "/suppliers/" + supplierId;

            //bindElement to the view
            this.getView().bindElement(sPath);
        },
        onBack: function(oEvent){
            debugger;
            var oHistory, sPrevHash;
            oHistory = History.getInstance();
            sPrevHash = oHistory.getPreviousHash();

            if (sPrevHash !== undefined) {
                window.history.go(-1);
            }else{
                this.oRouter.navTo("Home");
            }

        }
        
    });
    
});
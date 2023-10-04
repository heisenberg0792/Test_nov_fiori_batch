sap.ui.define([
    'praveen/controller/BaseController',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'
], function(BaseController, Filter, FilterOperator) {
    return BaseController.extend("praveen.controller.view1",{
        onInit: function(){
            this.oRouter = this.getOwnerComponent().getRouter();
        },
        //view1 controller functions
       onItemPress: function(oEvent){
                debugger;
                //Step 1: Get the path of the corresponding item from oEvent
                 var sPath = oEvent.getParameter('listItem').getBindingContextPath();

                //Step2:  Extract the index id from the path
                var productId = sPath.split("/")[sPath.split("/").length - 1];
                //var productId = sPath;

                //Get the sales order id
                //var orderId = oEvent.getParameter('listItem').getProperty("intro");

                //Get the sPath from the item
                //var sPath = oEvent.getParameter('listItem').getBindingContextPath();

                //Step3: call function module to go to next page
                this.onNext(productId);

       },
       onSearch: function(oEvent){

            debugger;
            //Step1: Get the search term
            var sQuery = oEvent.getParameter('query');
            //Step2: create a filter using the serach term
            var aFilter = new Filter({
                path: 'CATEGORY',
                operator: FilterOperator.Contains,
                value1: sQuery
            })
            //Step3: find the list object and apply the filter to the list object
            this.getView().byId("idList").getBinding("items").filter(aFilter);
       },
       onAdd: function(){
         //Nav to route "Add"
         this.oRouter.navTo("manageProduct");
       }
       
    });
    
});


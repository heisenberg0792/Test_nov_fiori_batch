sap.ui.define([
    'praveen/controller/BaseController',
    'sap/ui/core/Fragment'

], function(BaseController, Fragment) {
    return BaseController.extend("praveen.controller.view2",{
        onInit: function(){
            //get Router object
            this.oRouter = this.getOwnerComponent().getRouter();

            //Attch Route Match Handler function to the route "FruitDetails"
            this.oRouter.getRoute("productDetail").attachMatched(this.oRouteMatched, this);
        },
        oRouteMatched: function(oEvent){
            //1. Extract the fruit Id from oEvent
            //debugger;
            var productId = oEvent.getParameter('arguments').productId;

            //2. construct the path
            //var sPath = "/SalesOrderSet('" + orderId + "')";
            var sPath = "/" + productId;
            //var sPath = orderId;

            //3. Bind sPath to the element
            //   here, we are expanding the binding to "To_Supplier" entityset the code is handled in ODATA service
            this.getView().bindElement(sPath,{
                expand: "To_Supplier"
            });
        },
        onPress: function(oEvent){
            debugger;
            //get the binding Path
            var sPath = oEvent.getSource().getBindingContextPath();

            //get the Id of the supplier from sPath
            var supplierId = sPath.split("/")[sPath.split("/").length - 1];

            //to navigate to the new route call the getRoute from route object
            this.oRouter.navTo("SupplierDetails",{
                supplierId: supplierId
            });
        },
        oPopUpSupplier: null,
        onF4Help: function(oEvent){
            debugger;
            var that = this; //it's required because in promise function "this" pointer cannot be accessed
            if (!this.oPopUpSupplier) {
                Fragment.load({
                    name: "praveen.fragments.popup",
                    controller: this
                }).then(function(oFragment){
                    //Assign oFragment to the attribute oPopUpSupplier for future reference
                    that.oPopUpSupplier = oFragment;

                    //add oFragment as a dependent to the view
                    that.getView().addDependent(that.oPopUpSupplier);

                    //Now as the dependent is added, use the dependent(that.oPopUpSupplier) and bind element to the popup
                    that.oPopUpSupplier.bindAggregation("items",{
                        path:"/SupplierSet",
                        template: new sap.m.ObjectListItem({
                            title: '{COMPANY_NAME}',
                            intro: '{EMAIL_ADDRESS}',
                            number: '{PHONE_NUMBER}'
                        })
                    });

                    //open the popup
                    that.oPopUpSupplier.open();
                });
            }else{
                this.oPopUpSupplier.open();
            }



        }
    });
    
});
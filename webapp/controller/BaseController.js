sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'praveen/util/ReUseFunctions'
], function(Controller, ReUseFunctions) {
    'use strict';
    return Controller.extend("praveen.controller.BaseController",{
        //Reusable object can be declared here
        formatter: ReUseFunctions,
        oRouter: null,
        onInit: function(){
            //get the router object
            this.oRouter = this.getOwnerComponent().getRouter();
        },
        onNext: function(productId){

            // Navigate to Route
            this.oRouter.navTo("productDetail",{
                productId : productId
            });

            // get the Route
       }

    });
    
});
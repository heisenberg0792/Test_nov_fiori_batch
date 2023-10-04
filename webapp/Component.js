sap.ui.define([
    'sap/ui/core/UIComponent'
], function(UIComponent) {
    return UIComponent.extend("praveen.Component",{
        metadata:{
            manifest: "json"
        },
        init:function(){
            UIComponent.prototype.init.apply(this);
            var oRouter = this.getRouter(); //get the router from Component.js
                                            //getRouter() is a standard method in
                                            //"sap.ui.core.UIComponent" class
            oRouter.initialize(); // it will intialize the router
        },
        createComponent:function(){

            
        },
        destroy: function(){

        }
    });
    
});
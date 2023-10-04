sap.ui.define([
    'praveen/controller/BaseController',
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], function(BaseController, MessageBox, MessageToast) {
    return BaseController.extend("praveen.controller.manageProduct",{
        mode : "Create",
        setMode: function(oMode){
            this.mode = oMode;
            this.getView().byId("idSave").setProperty("text", this.mode);
            if (oMode === "Create") {
                this.getView().byId("idDelete").setProperty("enabled", false);
                this.getView().byId("name").setProperty("enabled", true);
            }else{
                this.getView().byId("idDelete").setProperty("enabled", true);
                this.getView().byId("name").setProperty("enabled", false);
            }
        },
        onInit: function() {
            //get router object
            this.oRouter = this.getOwnerComponent().getRouter();

            //set Route Match Handler function
            this.oRouter.getRoute("manageProduct").attachMatched(this.setData, this);
            //this.oRouter.getRoute("productDetail").attachMatched(this.oRouteMatched, this);

            this.setMode("Create");
        },
        setData: function(){
            //create a local JSON Model
            debugger;
            var oModel = new sap.ui.model.json.JSONModel();

            var data = {
                "prodData" : {
                    "PRODUCT_ID": "123",
                    "TYPE_CODE": "PR",
                    "CATEGORY": "PDAs & Organizers",
                    "NAME": " ",
                    "DESCRIPTION": "enter description here",
                    "SUPPLIER_ID": "0100000047",
                    "SUPPLIER_NAME": "",
                    "TAX_TARIF_CODE": "1",
                    "MEASURE_UNIT": "EA",
                    "PRICE": "",
                    "CURRENCY_CODE": "USD",
                    "DIM_UNIT": "CM",
                    "PRODUCT_PIC_URL": ""
                }
            };

            //set Model data
            oModel.setData(data);

            //set model to the view
            this.getView().setModel(oModel, "prod");
        },
        onClear: function(){
            //set the default values in the model
            debugger;
            var data = {
                "prodData" : {
                    "PRODUCT_ID": "123",
                    "TYPE_CODE": "PR",
                    "CATEGORY": "PDAs & Organizers",
                    "NAME": " ",
                    "DESCRIPTION": "enter description here",
                    "SUPPLIER_ID": "0100000047",
                    "SUPPLIER_NAME": "",
                    "TAX_TARIF_CODE": "1",
                    "MEASURE_UNIT": "EA",
                    "PRICE": "",
                    "CURRENCY_CODE": "USD",
                    "DIM_UNIT": "CM",
                    "PRODUCT_PIC_URL": ""
                }
            };
            this.getView().getModel("prod").setData(data);
            //this.getView().setModel(this.initModel, "prod");
            this.setMode('Create');
        },
        onSave: function(){
            //create a product using odata
            //Steps
            
            //Step 1: get the payload
            var payload = this.getView().getModel("prod").getProperty("/prodData");

            //Step 2: validation if required
            if (payload.PRODUCT_ID === ""){
                //sap.m.MessageBox.error("Product Id cannot be empty");
                MessageBox.error("proudct Id cannot be empty");
                //sap.m.MessageBox.error("This message should appear in the error message box");
                return;
            }
            if (payload.TAX_TARIF_CODE === 0 || payload.TAX_TARIF_CODE === ""){
                payload.TAX_TARIF_CODE = "1";
            }

            //Step 3: get the odata model object
            var oModel = this.getView().getModel(); //this fetches the default model which is nothing but odata model
                                                    //which we declared in manifest.json

            if (this.mode === "Create") {
                //Step 4: post the data to the backend
                oModel.create("/ProductSet", payload,{
                    //Step 5: Get the response success/error
                    //Success response
                    success: function(data){
                        debugger;
                        MessageBox.success('Product' + data.PRODUCT_ID + 'created Successfully');
                    },
                    //error response
                    error: function(oError){
                        debugger;
                        MessageBox.error(JSON.parse(oError.responseText).error.innererror.errordetails[0].message);
                    }
                });

            }else{
                //update
                oModel.update("/ProductSet('" + payload.PRODUCT_ID + "')", payload, {
                    success: function(){
                        MessageBox.success('Product' + payload.PRODUCT_ID + 'updated Successfully');
                    },
                    error: function(oError){
                        MessageBox.error(JSON.parse(oError.responseText).error.innererror.errordetails[0].message);
                    }
                });

            }
            
        },
        onEnter: function(oEvent){
            debugger;
            //Fetch the product ID
            var productId = oEvent.getSource().getValue();

            //get the model object
            var oModel = this.getView().getModel(); 

            var that = this;

            //call SAP odata to read single product
            oModel.read("/ProductSet('" + productId + "')", {
                success: function(data) {
                    debugger;
                    that.getView().getModel("prod").setProperty("/prodData", data);
                    that.setMode("update");
                },
                error: function(oError){
                    MessageToast.show('product not found, please create it')
                    that.setMode("Create");

                }
            });
            // handle call back

        },
        onDelete: function(oEvent){
            //Step1: Get the Product Id entered in the field
            debugger;
            //var productId = oEvent.getSource().getValue();
            var productId = this.getView().getModel('prod').getProperty('/prodData').PRODUCT_ID;
            //Step2: Get the ODATA model object
            var oModel = this.getView().getModel();

            var that = this;

            //Step3: Call the SAP ODATA Delete function to delete the object
            oModel.remove("/ProductSet('" + productId + "')", {
                success: function(data){
                    MessageBox.success('Product' + productId + 'deleted Successfully');   
                    that.onClear();
                },
                error: function(oError){
                    MessageBox.error(oError.responseText);
                }
            });

            //Step3: Handle Callback

        },
        getExpensiveProduct: function(oEvent){
            debugger;
            //Step1: get the category
            var oCategory = this.getView().byId("category").getSelectedKey();

            //Step2: get the model object
            var oModel = this.getView().getModel();

            //Step3: call Odata function import (getExpensiveProduct);
            var that = this;
            oModel.callFunction("/GetMostExpensiveProduct",{
                urlParameters: {
                    I_CATEGORY : oCategory
                },
                success: function(data){
                    debugger;
                    that.getView().getModel("prod").setProperty("/prodData", data);
                    that.setMode("update");
                },
                error: function(oError){
                    debugger;
                    MessageToast.show('product not found, please create it')
                    that.setMode("Create");
                }
            });


        }
        
    })
});
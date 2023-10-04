sap.ui.define([
   
], function() {
    return {
        getState: function(status){
            switch (status) {
                case 'Available':
                    return 'Success';
                    break;
                case 'Discontinued':
                    return 'Error';
                    break;
                case 'Out of Stock':
                    return 'Warning';
                    break;
                default:
                    return 'Error';
                    break;
            }
        }
    }
    
});
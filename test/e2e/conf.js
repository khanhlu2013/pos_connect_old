var env = require('./environment.js');

exports.config = {
    seleniumAddress: env.seleniumAddress,
    specs: 
    [
         './sp_app/main_page_name_search.js'                        
        // ,'./sp_app/main_page_sku_search.js'                          
        
        // ,'./sp_app/service/create/create_ui_test.js'                 
        // ,'./sp_app/service/create/create_ajax_test.js'  

        // ,'./sp_app/service/edit/sp.js'                               
        // ,'./sp_app/service/edit/sku.js'     
        // ,'./sp_app/service/edit/group.js'                            
        // ,'./sp_app/service/edit/kit.js'                              

        // ,'./group_app/group.js'                                      
        // ,'./tax_app/tax.js'                                                                 
        // ,'./shortcut_app/shortcut.setup.spec.js'                     
        // ,'./mix_match_app/mix_match.js'                              
        // ,'./payment_type_app/payment_type.spec.js'                        

        // ,'./sale_app/setup_shortcut.spec.js'  
        // ,'./sale_app/setup_pt.spec.js'                       
        // './sale_app/displaying_scan/tender_calculation_4_single_item.spec.js'      
        // ,'./sale_app/displaying_scan/non_inventory.spec.js'     
        // ,'./sale_app/offline_product.spec.js'
        // ,'./sale_app/hold.spec.js'   
        // ,'./sale_app/sale_able_info_dlg.spec.js'

        // ,'./sale_app/sale_finalizer__n__receipt_offline_report.spec.js'
        // ,'./receipt_app/sale_able_info_dlg.spec.js'
        
    ],
    baseUrl: env.baseUrl,
    onPrepare: function() {

    }
}
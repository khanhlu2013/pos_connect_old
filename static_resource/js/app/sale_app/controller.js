define(
[
     'angular'
    //--------
    ,'model/sp/service/info'
    ,'app/sale_app/service/scan/preprocess'
    ,'app/sale_app/service/scan/append_pending_scan'
    ,'app/sale_app/service/pending_scan/get_api'
    ,'model/sp/service/search/name_sku_online_dlg'
    ,'model/sp/api_offline'
    ,'app/sale_app/service/pending_scan/set_api'
    ,'app/sale_app/service/displaying_scan/modify_ds'
    ,'app/sale_app/service/sale_able_info_dlg'
    ,'app/sale_app/service/scan/sku_scan_not_found_handler'
    ,'service/ui'
    ,'app/sale_app/service/hold/api'
    ,'app/sale_app/service/hold/get_hold_ui'
    ,'app/sale_app/service/offline_product'
    ,'app/sale_app/service/scan/toogle_value_customer_price'
    ,'app/sale_app/service/finalize'
    ,'app/sale_app/service/displaying_scan/set_ds_lst'
    ,'app/sale_app/service/displaying_scan/calculate_ds_lst'
    ,'service/misc'
    ,'model/sp/service/non_inventory_prompt'
    ,'model/group/service/manage'
    ,'app/sale_app/service/init_db'
    ,'app/sale_app/service/tender_ui'
    ,'model/receipt/service/adjust_receipt_tender'
    ,'model/receipt/service/receipt_report'   
    ,'service/sync' 
    ,'model/receipt/service/sale_report'    
    ,'model/receipt/service/push'
    ,'model/shortcut/service/usage'
    ,'model/sp/service/duplicate'    
    ,'model/report/service/manage'
], function
(
     angular
)
{
    'use strict';
    
    var mod =  angular.module('sale_app/controller', 
    [
         'sp/service/info'
        ,'sale_app/service/scan/preprocess'
        ,'sale_app/service/scan/append_pending_scan'
        ,'sale_app/service/pending_scan/get_api'
        ,'sp/service/search/name_sku_online_dlg'
        ,'sp/api_offline'
        ,'sale_app/service/pending_scan/set_api'
        ,'sale_app/service/displaying_scan/modify_ds'
        ,'sale_app/service/sale_able_info_dlg'
        ,'sale_app/service/scan/sku_scan_not_found_handler'
        ,'sale_app/model'
        ,'sp/model'
        ,'service/ui'
        ,'sale_app/service/hold/api'
        ,'sale_app/service/hold/get_hold_ui'
        ,'sale_app/service/offline_product'
        ,'sale_app/service/scan/toogle_value_customer_price'
        ,'sale_app/service/finalize'
        ,'sale_app/service/displaying_scan/set_ds_lst'
        ,'sale_app/service/displaying_scan/calculate_ds_lst'
        ,'service/misc'
        ,'sp/service/non_inventory_prompt'
        ,'group/service/manage'
        ,'sale_app/service/init_db'
        ,'sale_app/service/tender_ui'
        ,'receipt/service/adjust_receipt_tender'
        ,'receipt/service/receipt_report'       
        ,'service/sync' 
        ,'receipt/service/sale_report'        
        ,'receipt/service/push'
        ,'shortcut/service/usage'
        ,'sp/service/duplicate'
        ,'report/service/manage'
    ]);
    mod.controller('Sale_page_ctrl', 
    [
         '$scope'
        ,'$rootScope'
        ,'$window'
        ,'sale_app/service/scan/preprocess'
        ,'sale_app/service/scan/append_pending_scan'
        ,'sale_app/service/pending_scan/get_api'
        ,'sp/service/search/name_sku_online_dlg/single'
        ,'sp/api_offline'
        ,'sale_app/service/pending_scan/set_api'
        ,'sale_app/model/Modify_ds_instruction'
        ,'sale_app/service/displaying_scan/modify_ds'
        ,'sale_app/service/sale_able_info_dlg'
        ,'sale_app/service/scan/sku_scan_not_found_handler'
        ,'service/ui/alert'
        ,'service/ui/prompt'
        ,'service/ui/confirm'
        ,'blockUI'   
        ,'sp/service/info'    
        ,'sale_app/service/hold/api'
        ,'sale_app/service/hold/get_hold_ui'
        ,'sale_app/service/offline_product/edit'
        ,'hotkeys'
        ,'sale_app/service/scan/toogle_value_customer_price'
        ,'sale_app/service/finalize'
        ,'sale_app/service/displaying_scan/set_ds_lst'
        ,'sale_app/service/displaying_scan/calculate_ds_lst'
        ,'service/misc'
        ,'sp/service/non_inventory_prompt'
        ,'group/service/manage'
        ,'sale_app/service/init_db'
        ,'sale_app/service/tender_ui'
        ,'receipt/service/adjust_receipt_tender'
        ,'receipt/service/receipt_report'
        ,'service/sync'
        ,'receipt/service/sale_report'    
        ,'service/ui/_3_option'    
        ,'receipt/service/push'
        ,'shortcut/service/usage'
        ,'sp/service/duplicate'
        ,'report/service/manage'
    ,function(
         $scope
        ,$rootScope
        ,$window
        ,preprocess
        ,append_pending_scan
        ,get_ps_lst
        ,search_name_sku_single_dlg
        ,sp_offline_api
        ,set_ps_lst
        ,Modify_ds_instruction
        ,modify_ds
        ,sale_able_info_dlg
        ,sku_scan_not_found_handler
        ,alert_service
        ,prompt_service
        ,confirm_service
        ,blockUI     
        ,sp_info_service   
        ,hold_api
        ,get_hold_ui
        ,edit_product_offline
        ,hotkeys
        ,toogle_value_customer_price
        ,finalize_receipt_service
        ,set_ds_lst
        ,calculate_ds_lst
        ,misc_service
        ,non_inventory_prompt_service
        ,manage_group
        ,init_db
        ,tender_ui
        ,adjust_receipt_tender
        ,receipt_report_service
        ,sync_service
        ,sale_report_dlg     
        ,_3_option_service
        ,push_receipt_service
        ,shortcut_usage_service
        ,duplicate_service
        ,manage_report
    ){

        hotkeys.bindTo($scope)
        .add({
            combo: 'ctrl+s',
            description: 'shortcut',
            allowIn: ['INPUT'],            
            callback: function() {
                $scope.shortcut_click();
            }
        })        
        .add({
            combo: 'ctrl+h',
            description: 'hold',
            callback: function() {
                $scope.hold()
            }
        })
        .add({
            combo: 'ctrl+g',
            description: 'get holds',
            callback: function() {
                $scope.get_hold_ui()
            }
        })
        .add({
            combo: 'f2',
            description: 'toogle value customer price',
            allowIn: ['INPUT'],
            callback: function() {
                $scope.toogle_value_customer_price();
                blockUI.start('testing')
            }
        })
        .add({
            combo: 'f7',
            description: 'tender',
            allowIn: ['INPUT'],
            callback: function() {
                $scope.finalize();blockUI.stop();
            }
        })
        .add({
            combo: 'ctrl+n',
            description: 'none inventory',
            allowIn: ['INPUT'],
            callback: function() {
                $scope.non_inventory_handler();
            }
        })

        function get_ds_index(ds){
            var index = -1;
            for(var i = 0;i<$scope.ds_lst.length;i++){
                if($scope.ds_lst[i] == ds){
                    index = i;
                    break;
                }
            }
            return index;
        }
        $scope.finalize = function(){
            if($scope.ds_lst.length === 0){return;}
            finalize_receipt_service($scope.ds_lst,$rootScope.GLOBAL_SETTING).then(
                function(receipt){
                    $scope.previous_receipt = receipt;
                    set_ps_lst([]);
                    $scope.cur_receipt_count += 1;
                    if($scope.next_receipt_count_reminder === null){
                        $scope.next_receipt_count_reminder = $rootScope.GLOBAL_SETTING.MAX_RECEIPT;//read at the declaration of this variable why i wait until now to init this value
                    }
                    if($scope.cur_receipt_count >= $scope.next_receipt_count_reminder){
                        var message = 'Do you want to save ' + $scope.cur_receipt_count + ' receipts online?';
                        var title = 'reminder'
                        var color_1 = 'orange';
                        var color_2 = 'orange';
                        var color_3 = 'green';
                        var caption_1 = 'snooze ' + $rootScope.GLOBAL_SETTING.MAX_RECEIPT_SNOOZE_1;
                        var caption_2 = 'snooze ' + $rootScope.GLOBAL_SETTING.MAX_RECEIPT_SNOOZE_2;
                        _3_option_service(title,message,caption_1,caption_2,'save','orange'/*title color*/,color_1,color_2,color_3).then(
                            function(selected_option){ 
                                if(selected_option === 1){
                                    $scope.next_receipt_count_reminder += $rootScope.GLOBAL_SETTING.MAX_RECEIPT_SNOOZE_1;
                                }else if(selected_option === 2){
                                    $scope.next_receipt_count_reminder += $rootScope.GLOBAL_SETTING.MAX_RECEIPT_SNOOZE_2;                                    
                                }else if(selected_option === 3){
                                    push_receipt_service($rootScope.GLOBAL_SETTING).then(
                                        function(response){
                                            alert_service(response.number_receipt_push + ' receipts saved','info','green');
                                            $scope.cur_receipt_count = 0;
                                            $scope.next_receipt_count_reminder = $rootScope.GLOBAL_SETTING.MAX_RECEIPT;
                                        },function(reason){
                                            alert_service(reason);
                                            $scope.next_receipt_count_reminder += $rootScope.GLOBAL_SETTING.MAX_RECEIPT_SNOOZE_2;  
                                        }
                                    )                             
                                }
                            },function(reason){
                                alert_service(reason);
                                $scope.next_receipt_count_reminder += $rootScope.GLOBAL_SETTING.MAX_RECEIPT_SNOOZE_2;                                
                            }
                        )
                    }
                }
                ,function(reason){
                    alert_service(reason)
                }
            )
        }
        $scope.toogle_value_customer_price = function(){
            toogle_value_customer_price($scope.ds_lst);
        }
        $scope.non_inventory_handler = function(){
            non_inventory_prompt_service(null/*original_non_inventory*/).then(
                function(non_inventory){
                    append_pending_scan.by_doc_id(null/*sp_doc_id*/,1/*qty*/,non_inventory,null/*override price*/);
                }
            )
        }
        $scope.get_tender_amount = function(){
            var result = 0.0;
            for(var i = 0;i<$scope.ds_lst.length;i++){
                result += $scope.ds_lst[i].get_line_total($rootScope.GLOBAL_SETTING.TAX_RATE);
            }
            return result;
        }
        $scope.get_hold_ui = function(){
            get_hold_ui($rootScope.GLOBAL_SETTING).then(
                function(hold){ 
                    set_ds_lst(hold.ds_lst); 
                }
                ,function(reason){ 
                    alert_service(reason); 
                }
            );
        }        
        $scope.hold = function(){
            if($scope.ds_lst.length == 0){
                alert_service('there is nothing to hold','info','blue');
                return;
            }
            confirm_service('confirm hold?','orange').then(
                function(){ hold_api.hold_current_pending_scan_lst(); }
            );
        }
        $scope.show_detail_price = function(ds){
            sale_able_info_dlg(ds,true/*is_enable_override_price*/,$rootScope.GLOBAL_SETTING.TAX_RATE).then(function(new_ds){
                var instruction = new Modify_ds_instruction(
                     undefined/*is_delete*/
                    ,undefined/*new_qty*/
                    ,new_ds.override_price/*new_price*/
                    ,undefined/*new_discount*/
                    ,undefined/*new_non_product_name*/
                );
                modify_ds(get_ds_index(ds),instruction,$scope.ds_lst);                      
            });          
        }
        $scope.remove_ds = function(ds){
            var instruction = new Modify_ds_instruction(
                 true/*is_delete*/
                ,undefined/*new_qty*/
                ,undefined/*new_price*/
                ,undefined/*new_discount*/
                ,undefined/*new_non_product_name*/
            );
            modify_ds(get_ds_index(ds),instruction,$scope.ds_lst);            
        }
        $scope.edit_qty = function(ds){
            prompt_service('change qty',ds.qty,false/*is null allow*/,false/*is float*/).then(
                function(new_qty_str){
                    var new_qty = parseInt(new_qty_str);
                    if(isNaN(new_qty)){return;}
                    if(new_qty<0){return;}

                    var instruction = new Modify_ds_instruction(
                         new_qty==0/*is_delete*/
                        ,new_qty
                        ,undefined/*new_price*/
                        ,undefined/*new_discount*/
                        ,undefined/*new_non_product_name*/
                    );
                    modify_ds(get_ds_index(ds),instruction,$scope.ds_lst);
                }
            )
        }
        $scope.edit_sp = function(ds){
            if(ds.is_non_inventory()){
                non_inventory_prompt_service(ds.non_inventory).then(
                    function(updated_non_inventory){
                        angular.copy(updated_non_inventory,ds.non_inventory);
                        set_ds_lst($scope.ds_lst); 
                    }
                )
            }else{
                if(ds.store_product.is_create_offline()){
                    edit_product_offline(ds.store_product,$rootScope.GLOBAL_SETTING).then( 
                        function(){ 
                            _refresh_edited_ds(ds); 
                        } 
                        ,function(reason){ 
                            alert_service(reason);
                            return; 
                        }
                    )
                }else{
                    var sp_copy = angular.copy(ds.store_product);
                    sp_info_service(sp_copy,$rootScope.GLOBAL_SETTING).then( 
                        function(){
                            _refresh_edited_ds(ds); 
                        }
                        ,function(reason){ 
                            if(typeof(reason) === 'string' && reason === '_duplicate_'){
                                duplicate_service(sp_copy,$rootScope.GLOBAL_SETTING).then
                                (
                                    function(sp){ 
                                        $scope.sku_search_str = sp.product.prod_sku_assoc_lst[0].sku_str;
                                        $scope.sku_scan();
                                    }
                                    ,function(reason){ 
                                        alert_service(reason);
                                    }
                                )
                            }else{
                                alert_service(reason);
                            }
                        }
                    )
                }
            }
        }
        function _refresh_edited_ds(ds){
            sp_offline_api.by_sp_doc_id(ds.store_product.sp_doc_id,$rootScope.GLOBAL_SETTING).then(
                function(sp){ 
                    ds.store_product = sp; set_ds_lst($scope.ds_lst); 
                }
                ,function(reason){ 
                    alert_service(reason); 
                }
            )
        }
        $scope.void = function(){ 
            set_ps_lst([]); 
        }
        $scope.shortcut_click = function(){
            shortcut_usage_service().then(
                function(child_shortcut){
                    if(child_shortcut.store_product === null){
                        $scope.non_inventory_handler();
                    }else{
                        append_pending_scan.by_product_id(child_shortcut.store_product.product_id,1/*qty*/,null/*non_inventory*/,null/*override_price*/,$rootScope.GLOBAL_SETTING);
                    }
                },function(reason){
                    alert_service(reason);
                }
            )
        }
        function _get_distinct_sp_from_ds_lst(ds_lst){
            var sp_lst = [];
            for(var i = 0;i<ds_lst.length;i++){
                var cur_ds = ds_lst[i];
                if(!cur_ds.is_non_inventory()){
                    var existed_sp = misc_service.get_item_from_lst_base_on_property('sp_doc_id'/*property*/,cur_ds.store_product.sp_doc_id/*value*/,sp_lst);
                    if(existed_sp === null){
                        sp_lst.push(cur_ds.store_product);
                    }
                }
            }
            return sp_lst;
        }
        $scope.refresh_ds = function(is_optimize_aka_use_sp_from_cur_ds_lst_without_re_search,sp_lst__extra_optimize_to_not_lookup){
            //is_optimize_aka_use_sp_from_cur_ds_lst_without_re_search if this param is true, we don't hit the local db to search for product
            blockUI.start('refresh page ...');
            console.log('refresh ds ...');
            var ps_lst = get_ps_lst();
            var optimize_distinct_sp = [];
            if(is_optimize_aka_use_sp_from_cur_ds_lst_without_re_search){
                optimize_distinct_sp = _get_distinct_sp_from_ds_lst($scope.ds_lst);
                if(sp_lst__extra_optimize_to_not_lookup !== null && sp_lst__extra_optimize_to_not_lookup !== undefined){
                    for(var i = 0;i<sp_lst__extra_optimize_to_not_lookup.length;i++){
                        optimize_distinct_sp.push(sp_lst__extra_optimize_to_not_lookup[i]);
                    }
                }
            }
            calculate_ds_lst(ps_lst,optimize_distinct_sp,$rootScope.GLOBAL_SETTING).then(
                 function(data){
                    $scope.ds_lst = data;
                    $scope.is_focus_sku_txt = true;
                    console.log('is focus sku txt' + $scope.is_focus_sku_txt);                    
                    blockUI.stop();
                }
                ,function(reason){
                    alert_service(reason);
                    blockUI.stop()
                }
            )            
        }
        $scope.sku_scan = function(){
            $scope.sku_search_str = $scope.sku_search_str.trim();
            preprocess.exe($scope.sku_search_str,$rootScope.GLOBAL_SETTING).then(
                 function(data){ 
                    $scope.sp_lst__extra_optimize_to_not_lookup = [data.sp,];
                    append_pending_scan.by_doc_id(data.sp.sp_doc_id,data.qty,null/*non_inventory*/,null/*override price*/); 
                }
                ,function(reason){ 
                    if(reason != preprocess.SKU_NOT_FOUND){ 
                        alert_service(reason);
                        return; 
                    }
                    else{ 
                        //SKU NOT FOUND HANDLER
                        preprocess.extract_qty_sku($scope.sku_search_str).then(
                            function(extracted_result){
                                sku_scan_not_found_handler(extracted_result.sku,$rootScope.GLOBAL_SETTING).then(
                                    function(){ 
                                        $scope.sku_scan();
                                    }
                                    ,function(reason){
                                        if(reason === '_non_inventory_'){
                                            $scope.non_inventory_handler();
                                        }else{
                                            alert_service(reason);
                                        }
                                    }
                                )
                            }
                        )
                    }
                }
            )
        }
        $scope.search = function(){ 
            search_name_sku_single_dlg().then(
                function(sp){
                    append_pending_scan.by_product_id(sp.product_id,1/*qty*/,null/*non_inventory*/,null/*override_price*/,$rootScope.GLOBAL_SETTING);
                }
            )
        }
        $scope.get_abbreviate_cur_deal = function(ds){
            var result = "";
            if(ds.mm_deal_info !==null){
                result = '(' + ds.mm_deal_info.mm_deal.qty + '$' + ds.mm_deal_info.mm_deal.mm_price + ')';
            }
            return result;
        }
        $scope.get_abbreviate_suggest_deal_lst = function(ds){
            var result = "";
            if(ds.mm_deal_info ===null &&ds.possible_deal_lst.length !== 0){
                for(var i = 0;i<ds.possible_deal_lst.length;i++){
                    result += '(' + ds.possible_deal_lst[i].qty + '$' + ds.possible_deal_lst[i].mm_price + ')';
                }
            }
            return result;
        }
        $scope.menu_action_sync = function(){
            sync_service($rootScope.GLOBAL_SETTING).then(
                function(response){
                    alert_service(response,'info','green');
                    $scope.refresh_ds(false/*we do not optimize here*/,null/*extra sp to optimize and prevent lookup sp*/);
                },function(reason){
                    alert_service(reason);
                }
            )
        }
        $scope.menu_report_create_in_sale_page = function(){
            manage_report();
        }        
        $scope.menu_setting_group_in_sale_page = function(){
            manage_group($rootScope.GLOBAL_SETTING).then(
                function(){
                    $scope.refresh_ds(false/*we do not optimize here*/,null/*extra sp to optimize and prevent lookup sp*/);
                }
                ,function(reason){
                    alert_service(reason);
                }
            )
        }
        $scope.menu_report_sale = function(){
            sale_report_dlg($rootScope.GLOBAL_SETTING);             
        }
        $scope.menu_report_receipt_in_sale_page = function(){
            receipt_report_service($rootScope.GLOBAL_SETTING).then(
                function(){
                    $scope.previous_receipt = null;//previous receipt's tender ln could be updated, making the change amount could be wrong. i am voting previous receipt no support after comming out of receipt dialog
                },function(reason){
                    alert_service(reason);
                }
            )
        }
        $scope.launch_product = function(){
            confirm_service('launch product app?').then(function(){
                $window.open('/');
            });  
        }
        $scope.change_previous_receipt_tender_ln = function(){
            tender_ui($scope.previous_receipt.receipt_ln_lst,$scope.previous_receipt.tender_ln_lst,$scope.previous_receipt.tax_rate,$rootScope.GLOBAL_SETTING).then(
                function(new_tender_ln_lst){
                    adjust_receipt_tender($scope.previous_receipt,new_tender_ln_lst,$rootScope.GLOBAL_SETTING).then(
                        function(receipt){
                            $scope.previous_receipt = receipt;
                        },function(reason){
                            alert_service(reason);
                        }
                    )
                },function(reason){
                    alert_service(reason);
                }
            )
        }

        //init code
        $scope.cur_receipt_count = 0;//initial receipt count after pushing
        $scope.next_receipt_count_reminder = null//the true is that we should init next_receipt_count_reminder to GLOBAL_SETTING.max_receipt . but if we do this, this code will be hard to test. So here i sacrify a bit of code readability and make this easy to test. Here is the problem. in test, i can not wait to create 200 receipt to test for max receipt so i need to reduce this amount to speed up test. However, i can only change global setting after the page is loaded. After the page is loaded, this next_receipt_count_reminder is already init and i don't know how to change this scope in protractor. I can onl change rootScope.global_setting. but only after the page is laod which is a bit too late. To fix this, i refrain init this variable here until after the page is load.
        $scope.sku_search_str = "";
        $scope.ds_lst = [];
        $scope.previous_receipt = null;
        $scope.sp_lst__extra_optimize_to_not_lookup = null;//the most reasently searched sp should be added both place: pending_scan_lst to trigger the watch, and here to help refresh_ds not to relook for sp

        init_db($rootScope.GLOBAL_SETTING).then(
            function(){
                $scope.refresh_ds(true/*we wish to optimize but it make no differece since this is the first time, cur ds_lst is empty anyway*/,null/*extra sp to optimize and prevent lookup sp*/);
                $scope.$watchGroup(
                    [
                        function(){
                            return JSON.stringify(get_ps_lst());
                        }//the reason i return a string representation of ps_lst is that get_ps_lst() always return a new created ps_lst which have a new identity all the time. This cause the watch to do infinite loop
                        ,function(){
                            return $rootScope.GLOBAL_SETTING.MIX_MATCH_LST;
                        }
                    ]
                    ,function(newVal,oldVal,scope){
                        $scope.refresh_ds(true,$scope.sp_lst__extra_optimize_to_not_lookup/*extra sp to optimize and prevent lookup sp*/);
                    }
                );
            },
            function(reason){
                alert_service(reason);
            }
        )
    }]);
});
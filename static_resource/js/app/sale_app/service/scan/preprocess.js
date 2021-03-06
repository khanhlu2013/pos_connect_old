define(
[
     'angular'
    //-------
    ,'model/sp/api_offline'
    ,'model/sp/service/select_sp_dlg'
]
,function
(
    angular
)
{
    var mod = angular.module('sale_app/service/scan/preprocess',
    [
         'sp/api_offline'
        ,'sp/service/select_sp_dlg'
    ]);
    mod.factory('sale_app/service/scan/preprocess',
    [
         '$q'
        ,'sp/api_offline'
        ,'sp/service/select_sp_dlg'
        ,'blockUI'
    ,function(
         $q
        ,offline_sp_api
        ,select_sp
        ,blockUI
    ){
        var SKU_NOT_FOUND = 'sku not found';

        function extract_qty_sku(scan_str){
            //init
            var defer = $q.defer();
            scan_str = scan_str.trim();
            var lst = scan_str.split(' ');
            var qty = null;var sku = null;  

            if(scan_str.length == 0){ return $q.reject('_cancel_'); }// reject empty scan
            if(lst.length >= 3){ return $q.reject('invalid scan'); }//reject 3 token scan
            if(lst.length == 2){
                var temp_qty = parseInt(lst[0]);
                if(isNaN(temp_qty)){ return $q.reject(lst[0] + ' is not a valid qty'); }
                else if(temp_qty<0){ return $q.reject('qty must be a positive number'); }
                else{ defer.resolve({qty:temp_qty,sku:lst[1]});return defer.promise; }
            }else{ defer.resolve({qty:1,sku:lst[0]});return defer.promise; }
        }

        function exe(scan_str,GLOBAL_SETTING){
            blockUI.start('process scan string');
            var defer = $q.defer();
            extract_qty_sku(scan_str).then(
                function(sku_qty){
                    var sku = sku_qty.sku;var qty = sku_qty.qty;

                    offline_sp_api.by_sku(sku,GLOBAL_SETTING).then(
                        function(sp_lst){
                            if(sp_lst.length > 1){
                                blockUI.stop();
                                select_sp(sp_lst).then(
                                    function(sp){ 
                                        defer.resolve({qty:qty,sp:sp}); 
                                    }
                                    ,function(reason){
                                        defer.reject(reason); 
                                    }
                                )
                            }
                            else if(sp_lst.length == 1){ 
                                defer.resolve({qty:qty,sp:sp_lst[0]});blockUI.stop(); 
                            }else{ 
                                defer.reject(SKU_NOT_FOUND);blockUI.stop(); 
                            }
                        }
                        ,function(reason){
                            defer.reject(reason);blockUI.stop();
                        }
                    );
                }
                ,function(reason){
                    defer.reject(reason);blockUI.stop()
                }
            )
            return defer.promise;
        }

        return{
            exe:exe,
            extract_qty_sku : extract_qty_sku,
            SKU_NOT_FOUND : SKU_NOT_FOUND
        }
    }])
})
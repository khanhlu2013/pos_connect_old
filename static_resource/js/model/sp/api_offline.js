/*
    INTRO:
        In offline world, because of offline-created Store_product does not contain product_id, we use sp_doc_id as an alternative identifier

    PURPOSE:
        This file provide a service to search Store_product offline within pouchdb and its breakdown_assoc_lst (recursively) based on sp_doc_id or product_id
*/

define(
[
     'angular'
    //-------
    ,'util/offline_db'
    ,'model/sp/model'
    ,'model/product/model'
    ,'service/misc'
]
,function
(
    angular
)
{
    var mod = angular.module('sp/api_offline',
    [
         'util/offline_db'
        ,'sp/model'
        ,'product/model'
        ,'service/misc'
    ]);

    mod.factory('sp/api_offline',
    [
         '$q'
        ,'util/offline_db/get'
        ,'sp/model/Store_product'
        ,'sp/model/Kit_breakdown_assoc'        
        ,'product/model/Product'   
        ,'product/model/Prod_sku_assoc'   
        ,'service/misc'
        ,'blockUI'
    ,function(
         $q
        ,get_offline_db
        ,Store_product
        ,Kit_breakdown_assoc
        ,Product
        ,Prod_sku_assoc
        ,misc_service
        ,blockUI
    ){
        function _create_sp(sp_couch,sp_lst_of_bd_assoc){
            var prod_sku_assoc_lst = [];
            for(var i = 0;i<sp_couch.sku_lst.length;i++){
                var temp = new Prod_sku_assoc(
                     sp_couch.product_id
                    ,null//creator id
                    ,[sp_couch.store_id,]//store_lst
                    ,sp_couch.sku_lst[i]//sku_str
                );
                prod_sku_assoc_lst.push(temp);
            }
            var product = new Product(
                 sp_couch.product_id
                ,null//name
                ,null//sp_lst
                ,prod_sku_assoc_lst
            );
            var breakdown_assoc_lst = [];
            for(var i = 0;i<sp_couch.breakdown_assoc_lst.length;i++){
                var assoc = sp_couch.breakdown_assoc_lst[i];
                var sp = misc_service.get_item_from_lst_base_on_property('product_id'/*property*/,assoc.product_id,sp_lst_of_bd_assoc);
                breakdown_assoc_lst.push(new Kit_breakdown_assoc(null/*id*/,sp/*breakdown*/,assoc.qty))
            }
            var kit_assoc_lst = null;/* Since sp.kit_assoc_lst does not need to collect sale data, i decided not to store this info offline to simplify the project. (this info is needed for client-side validation when updating sp.kit info) In this case, since we instantiate sp from searching from offline db (versus from ajax data), sp does not contain this info. If user decided to edit kit info from this sp instance, we will by pass client-side validation which prevent infinte loop when breakdown contain kit*/
            var sp = new Store_product(
                 sp_couch.id
                ,sp_couch.product_id
                ,sp_couch.store_id
                ,sp_couch.name
                ,sp_couch.price
                ,sp_couch.value_customer_price
                ,sp_couch.crv
                ,sp_couch.is_taxable
                ,sp_couch.is_sale_report
                ,sp_couch.p_type
                ,sp_couch.p_tag
                ,sp_couch.cost
                ,sp_couch.vendor
                ,sp_couch.buydown
                ,product
                ,null//group_lst
                ,breakdown_assoc_lst
                ,kit_assoc_lst                           
                ,sp_couch._id
                ,sp_couch._rev
                ,null//cur_stock : we don't store this info in couch/pouch
                ,null//report_lst
            );
            return sp;
        }

        function _post_search_aka_recursive_search_for_bd_and_form_sp(sp_couch,GLOBAL_SETTING){
            var defer = $q.defer();

            if(sp_couch.breakdown_assoc_lst.length === 0){
                defer.resolve(_create_sp(sp_couch,[]/*breakdown assoc lst*/));
            }else{
                var promise_lst = [];
                for(var i = 0;i<sp_couch.breakdown_assoc_lst.length;i++){
                    promise_lst.push(by_product_id(sp_couch.breakdown_assoc_lst[i].product_id,GLOBAL_SETTING))
                }
                $q.all(promise_lst).then(
                     function(data){ defer.resolve(_create_sp(sp_couch,data)); }
                    ,function(reason){ defer.reject(reason); }
                )
            }
            return defer.promise;
        }

        function by_product_id(product_id,GLOBAL_SETTING){
            blockUI.start('search sp by product_id: ' + product_id);
            var defer = $q.defer();

            var db = get_offline_db(GLOBAL_SETTING);
            db.query('views/by_product_id',{key:product_id}).then(function(lst){
                if(lst.rows.length == 0){ defer.resolve(null); blockUI.stop();}
                else if(lst.rows.length > 1){ defer.reject('multiple product found for 1 product_id ' + product_id); blockUI.stop(); }
                else{
                    var sp_couch = lst.rows[0].value;
                    _post_search_aka_recursive_search_for_bd_and_form_sp(sp_couch,GLOBAL_SETTING).then(
                         function(sp){ defer.resolve(sp); blockUI.stop(); }
                        ,function(reason){ defer.reject(reason); blockUI.stop(); }
                    )

                }
            });
            return defer.promise; 
        }
        
        function by_sp_doc_id(sp_doc_id,GLOBAL_SETTING){
            blockUI.start('search sp by doc_id: ' + sp_doc_id);
            var defer = $q.defer();
            var db = get_offline_db(GLOBAL_SETTING);
            db.get(sp_doc_id).then(
                function(pouch_result){
                    _post_search_aka_recursive_search_for_bd_and_form_sp(pouch_result,GLOBAL_SETTING).then(
                         function(sp){ 
                            defer.resolve(sp); 
                            blockUI.stop(); 
                        }
                        ,function(reason){ 
                            defer.reject(reason); 
                            blockUI.stop(); 
                        }
                    )                    
                }
                ,function(reason){
                    defer.reject('Bug: can not find sp by doc_id in local database. Click void to try again.');
                    blockUI.stop();
                }
            );        
            return defer.promise; 
        }

        function by_sku(sku,GLOBAL_SETTING){
            blockUI.start('search for sku: ' + sku )
            var defer = $q.defer();
            var return_lst = [];
            var promise_lst = [];

            var db = get_offline_db(GLOBAL_SETTING);
            db.query('views/by_sku',{key:sku}).then(function(result){
                for(var i=0;i<result.rows.length;i++){
                    var sp_couch = result.rows[i].value;
                    promise_lst.push(_post_search_aka_recursive_search_for_bd_and_form_sp(sp_couch,GLOBAL_SETTING));
                }

                $q.all(promise_lst).then(
                    function(data){
                        for(var i=0;i<data.length;i++){
                            return_lst.push(data[i]);
                        }
                        defer.resolve(return_lst);
                        blockUI.stop();
                    }
                    ,function(reason){ defer.reject(reason); blockUI.stop();}
                )   
            });
            return defer.promise;
        }

        return{
             by_sp_doc_id : by_sp_doc_id
            ,by_product_id : by_product_id
            ,by_sku : by_sku
        }
    }])
})
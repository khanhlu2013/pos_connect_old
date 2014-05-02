define(
    [
         'lib/async'
        ,'app/store_product/sp_prompt'
        ,'app/store_product/sp_online_getter'
        ,'app/local_db_initializer/sync_if_nessesary'
        ,'app/product/product_json_helper'
    ]
    ,function
    (
         async
        ,sp_prompt
        ,sp_online_getter
        ,sync_if_nessesary
        ,product_json_helper
    )
{
    function sp_online_updator(
         store_id
        ,product_id 
        ,couch_server_url

        ,name
        ,price
        ,crv
        ,is_taxable
        ,is_sale_report
        ,p_type
        ,p_tag
        ,cost
        ,vendor
        ,buydown
        ,callback
    ){
        $.ajax({
             url : '/product/update_sp'
            ,type : "POST"
            ,dataType : "json"
            ,data : {
                 product_id:product_id
                ,name:name
                ,price:price
                ,crv:crv
                ,is_taxable:is_taxable
                ,is_sale_report:is_sale_report
                ,p_type:p_type
                ,p_tag:p_tag
                ,cost:cost
                ,vendor:vendor
                ,buydown:buydown
            }
            ,success: function(data,status_str,xhr){
                callback(null,data)
            }
            ,error: function(xhr,status_str,err){
                callback(xhr);
            }
        }); 
    }

    function updator(store_id,product_id,couch_server_url,result,callback){
        var sp_online_updator_b = sp_online_updator.bind
        (
             sp_online_updator
            ,store_id
            ,product_id
            ,couch_server_url

            ,result.name
            ,result.price
            ,result.crv
            ,result.is_taxable
            ,result.is_sale_report
            ,result.p_type
            ,result.p_tag
            ,result.cost
            ,result.vendor
            ,result.buydown
        );

        async.waterfall([sp_online_updator_b],function(error,result){
            callback(error,result);
        });
    }

    function prompt(store_id,product_getter_result,callback){
        var product = product_getter_result.product;
        var lookup_type_tag = product_getter_result.lookup_type_tag;
        var sp = product_json_helper.get_sp_from_p(product,store_id);
        
        var sp_prompt_b = sp_prompt.show_prompt.bind
        (
             sp_prompt.show_prompt
            ,sp.name
            ,sp.price
            ,sp.crv
            ,sp.is_taxable
            ,sp.is_sale_report
            ,sp.p_type
            ,sp.p_tag
            ,null   //prefill_sku
            ,false  //is_prompt_sku
            ,sp.cost
            ,sp.vendor
            ,sp.buydown
            ,lookup_type_tag
            ,true //is_sku_management
            ,null //suggest product
        );    

        async.waterfall([sp_prompt_b],function(error,result){
            callback(error,result);
        });    
    }

    function exe(product_id,store_id,couch_server_url,callback){
        console.assert(product_id,'param product_id is invalid');
        console.assert(store_id,'param store_id is invalid');
        console.assert(couch_server_url,'param couch_server_url is invalid');

        var getter_b = sp_online_getter.bind(sp_online_getter,product_id,false/*is_include_other_store*/,true/*is_lookup_type_tag*/);
        var prompt_b = prompt.bind(prompt,store_id);
        var updator_b = updator.bind(updator,store_id,product_id,couch_server_url);

        async.waterfall([getter_b,prompt_b,updator_b],function(error,result){
            if(error){
                callback(error,null);
            }else{
                var product = result;
                var sync_b = sync_if_nessesary.bind(sync_if_nessesary,store_id,couch_server_url);
                async.waterfall([sync_b],function(error,result){
                    callback(error,product);
                });                 
            }
        });
    }

    return {
         exe:exe
    }
});

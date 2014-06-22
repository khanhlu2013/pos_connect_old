define(
[
    'lib/ui/ui'
]
,function
(
    ui
)
{
    return function (product_id,is_include_other_store,callback){
        ui.ui_block('get product info ...')
        $.ajax({
             url : '/product/search_by_pid'
            ,type : 'GET'
            ,dataType : 'json'
            ,data : {
                 'product_id':product_id
                ,'is_include_other_store':is_include_other_store
            }
            ,success : function(data,status_str,xhr){
                ui.ui_unblock();
                callback(null/*error*/,data);
            }
            ,error : function(xhr,status_str,err){
                ui.ui_unblock();
                callback(xhr);
            }
        });
    }
});
define(
    [

    ],
    function
    (

    )
{
    return function (callback){
        $.ajax({
             url : "/sale_shortcut/get_data"
            ,type : "POST"
            ,dataType: "json"
            ,data : null
            ,success : function(parent_lst) {
                callback(null/*error*/,parent_lst/*result*/);
            }
            ,error : function(xhr,errmsg,err) {
                callback('there is an error')
            }
        });
    }
});
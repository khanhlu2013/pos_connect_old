define(
	[
		 'lib/object_store/get_os'
		,'lib/async'
		,'app/receipt/Receipt'
	]
	,function
	(
		 get_os
		,async
		,Receipt
	)
{
	return function(store_pdb,ds_lst,tax_rate,collect_amount,callback){
 		var receipt = new Receipt
        (
             null//_id
            ,null//_rev 
            ,null//_doc_id_rev 
            ,null//key
            ,new Date().getTime()//time_stamp
            ,tax_rate
            ,ds_lst
            ,collect_amount
        );

		store_pdb.post(receipt, function(err, response) {
			callback(err);
		});
 	}
});
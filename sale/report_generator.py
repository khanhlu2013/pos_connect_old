UNDEFINED_TYPE_STR = 'undefined'


def update_dic(key,amount,dic):
    if key in dic:
        dic[key] += amount
    else:
        dic[key] = amount


def exe(receipt_lst): # xxx naming is hard to understand. subject to refactor
    """
        RETURN: a dictionary, with keys such as: tax, non_tax, different kind of p_type, different type of non_product_name, used for sale report.
    """
    dic = {}

    receipt_ln_lst = []
    for receipt in receipt_lst:
        receipt_ln_lst += receipt.receipt_ln_lst.all()

    for item in receipt_ln_lst:
        amount = item.get_total_out_the_door_price()
        
        if item.store_product != None and item.store_product.is_sale_report:
            #TAX - NON_TAX
            key = 'tax' if item.store_product.is_taxable else 'non_tax'
            update_dic(key,amount,dic)

            if item.store_product.p_type != None: 
                update_dic(item.store_product.p_type,amount,dic)
            else:
                update_dic(UNDEFINED_TYPE_STR,amount,dic)

        elif item.store_product == None:
            update_dic(item.non_product_name,amount,dic)

    return dic
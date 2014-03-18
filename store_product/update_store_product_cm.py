from store_product.couch import store_product_couch_getter
from store_product.models import Store_product
from store.couch import store_util
from util.couch import couch_util

def exe(
     product_id
    ,business_id
    ,name
    ,price
    ,crv
    ,isTaxable
    ,isTaxReport
    ,isSaleReport 
    ,p_type = None
    ,p_tag = None
):
    
    exe_master( \
         product_id
        ,business_id
        ,name
        ,price
        ,crv
        ,isTaxable
        ,isTaxReport
        ,isSaleReport
        ,p_type
        ,p_tag
    )

    exe_couch(\
         product_id
        ,business_id
        ,name
        ,price
        ,crv
        ,isTaxable)

def exe_couch(
     product_id
    ,business_id
    ,name
    ,price
    ,crv
    ,isTaxable):
    #retrieve
    couch_prod_bus_assoc = store_product_couch_getter.exe(product_id,business_id)
    
    #update
    couch_prod_bus_assoc['name'] = name
    couch_prod_bus_assoc['price'] = couch_util.number_2_str(price)
    couch_prod_bus_assoc['crv'] = couch_util.number_2_str(crv)
    couch_prod_bus_assoc['is_taxable'] = isTaxable
    
    #save
    db = store_util.get_store_db(business_id)
    db.save(couch_prod_bus_assoc)

def exe_master( \
     product_id
    ,business_id
    ,name
    ,price
    ,crv
    ,isTaxable
    ,isTaxReport
    ,isSaleReport
    ,p_type
    ,p_tag
):

    rel_prod_bus_assoc = Store_product.objects.get(product__id=product_id,business__id=business_id)
    rel_prod_bus_assoc.name = name
    rel_prod_bus_assoc.price = price
    rel_prod_bus_assoc.crv = crv
    rel_prod_bus_assoc.isTaxable = isTaxable
    rel_prod_bus_assoc.p_type = p_type
    rel_prod_bus_assoc.p_tag = p_tag


    if isTaxReport != None or isSaleReport != None: # xxx fishy code
        rel_prod_bus_assoc.isTaxReport = isTaxReport
        rel_prod_bus_assoc.isSaleReport = isSaleReport

    rel_prod_bus_assoc.save()
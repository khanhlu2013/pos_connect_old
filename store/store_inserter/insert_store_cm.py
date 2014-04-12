from helper import password_helper
from product.models import Product
import store.models
import json
import requests
from tax.couch import tax_util
from tax.couch.models import Tax_document
from util.couch import master_account_util,user_util
from couch import couch_util,couch_constance
from sale.sale_couch.receipt import receipt_document_validator
from util.couch import couch_acl_validator
import hashlib
import os
from helper import test_helper
from couch import couch_util

def exe(store):
    store_id,username = exe_master(store)
    exe_couch(store_id,store.tax_rate,username)

def test_xxx():
    headers={'referer': 'https://%s.cloudant.com' % (master_account_util.get_master_user_name()), 'content-type': 'multipart/form-data'}
    url='https://cloudant.com/api/generate_api_key'
    r = requests.post(url,headers=headers,auth=(master_account_util.get_master_user_name(),master_account_util.get_master_user_password()))
    return r
        
def create_user_account():
    if test_helper.is_local_env():
        return (1,1)

    headers={'referer': 'https://%s.cloudant.com' % (master_account_util.get_master_user_name()), 'content-type': 'multipart/form-data'}
    url='https://cloudant.com/api/generate_api_key'
    r = requests.post(url,headers=headers,auth=(master_account_util.get_master_user_name(),master_account_util.get_master_user_password()))

    if not r.ok:
        raise Exception('error code: ' + str(r.status_code) + ' ,reason: ' + r.reason)
    else:
        print('-xxx-')
        print(r._content)
        return (r._content['key'],r._content['password'])


def exe_master(store):
    store.api_key_name,store.api_key_pwrd = create_user_account()
    store.save(by_pass_cm=True)
    store_id = store.id
    
    # xxx need to remove when we can install cloudant into development machine
    if test_helper.is_local_env():
        store_db_name = couch_util._get_store_db_name(store_id)
        store.api_key_name = store_db_name
        store.api_key_pwrd = store_db_name
        store.save(by_pass_cm=True)

    return store.id,store.api_key_name


def _couch_db_grant_access_to_db(api_key_name,db_name,roles):
    if test_helper.is_local_env():
        return

    url = 'https://cloudant.com/api/set_permissions'
    prefix = master_account_util.get_master_user_name()

    role_str = ""
    for item in roles:
        role_str += ('&roles=' + item)

    data_str = 'database=%s/%s&username=%s' % (prefix,db_name,api_key_name)
    data_str += role_str
    headers = {'content-type': 'application/x-www-form-urlencoded'}

    r = requests.post(url,data=data_str,headers=headers,auth=(master_account_util.get_master_user_name(),master_account_util.get_master_user_password()))


def exe_couch(store_id,tax_rate,api_key_name):
    _couch_db_insert_db(store_id)
    _couch_db_insert_view(store_id)
    _couch_db_insert_validation(store_id)
    _couch_db_insert_tax_rate(store_id,tax_rate)
    _couch_db_grant_access_to_db(api_key_name,couch_util._get_store_db_name(store_id),['_reader','_writer'])



def _couch_db_insert_tax_rate(store_id,tax_rate):
    db = couch_util.get_store_db(store_id)
    tax_document = Tax_document(
         id = tax_util.get_tax_document_id()
        ,business_id = store_id
        ,tax_rate  = tax_rate
    )
    db.update([tax_document,])


def _couch_db_insert_db(store_id):
    #CREATE LIQUOR DATABASE
    server = couch_util._get_couch_server()
    db_name = couch_util._get_store_db_name(store_id)
    return server.create(db_name)


def _couch_db_insert_view(store_id):
    d_type_view_map_function = \
        """function(doc) {
          if(doc.d_type != undefined){
            emit(doc.d_type, doc);
          }
        }"""

    product_id_view_map_function = \
    """function(doc) {
      if(doc.d_type.localeCompare('%s')==0){
        emit(doc.product_id, doc);
      }
    }""" % (couch_constance.STORE_PRODUCT_DOCUMENT_TYPE,)

    sku_view_map_function = \
    """function(doc) {
      if(doc.d_type == '%s')
      for(var i=0; i<doc.sku_lst.length;i++){
        emit(doc.sku_lst[i], doc);
      }
    }""" % (couch_constance.STORE_PRODUCT_DOCUMENT_TYPE,)

    views = { \
         couch_constance.STORE_DB_VIEW_NAME_BY_PRODUCT_ID:{"map":product_id_view_map_function}
        ,couch_constance.STORE_DB_VIEW_NAME_BY_SKU:{"map":sku_view_map_function}
        ,couch_constance.STORE_DB_VIEW_NAME_BY_D_TYPE:{"map":d_type_view_map_function}
        
    }

    view_doc = {"_id":couch_constance.VIEW_DOCUMENT_ID,"language":"javascript","views":views}
    db = couch_util.get_store_db(store_id)
    db.save(view_doc)


def _couch_db_insert_validation(business_id):

    db = couch_util.get_store_db(business_id)
    
    #ACL - VALIDATION
    acl_validator_doc  = {"_id":"_design/validation",  "validate_doc_update":couch_acl_validator.src}
    db.save(acl_validator_doc)

    #RECEIPT DOCUMENT VALIDATOR
    receipt_validator = {"_id":"_design/receipt_validator",  "validate_doc_update":receipt_document_validator.src}
    db.save(receipt_validator)







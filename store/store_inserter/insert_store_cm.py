from helper import password_helper
from product.models import Product
import store.models
import json
import requests
from util.couch import user_util
from couch import couch_util
from django.conf import settings
from util.couch import old_security_4_test_purpose
import hashlib
import os
from couch import couch_util
from couchdb import Server

def exe(store):
    if _is_local_env():
        exe_offline(store)
    else:
        exe_online(store)

    store_id,api_key_name = exe_master(store)
    exe_couch(store_id,api_key_name)

def exe_

def exe_master(store):
    if _is_local_env():
        store.api_key_name,store.api_key_pwrd = (1,1)        
    else:
        store.api_key_name,store.api_key_pwrd = get_cloudant_api_key()
    store.save(by_pass_cm=True)

    #overwrite key_name and password under local env
    if _is_local_env():
        store_db_name = couch_util.get_store_db_name(store.id)
        store.api_key_name,store.api_key_pwrd = store_db_name,store_db_name
        store.save(by_pass_cm=True)

    return store.id,store.api_key_name


def exe_couch_online(store_id,couch_user,couch_pwrd,couch_url,api_key_name):
    #create db
    couch_url = couch_util.get_couch_access_url(couch_user,couch_pwrd,couch_url)
    server = Server(couch_url)
    db_name = settings.STORE_DB_PREFIX + str(store_id)
    db = server.create(db_name)

    #insert view
    _couch_db_insert_view(db)
    _couch_db_grant_cloudant_access_to_api_key(api_key_name,store_id,['_reader',])

    if _is_local_env():
        old_security_4_test_purpose.exe(store_id)
    else:
        

def get_cloudant_api_key():
    headers={'referer': 'https://%s.cloudant.com' % (settings.COUCH_MASTER_USER_NAME), 'content-type': 'multipart/form-data'}
    url='https://cloudant.com/api/generate_api_key'
    r = requests.post(url,headers=headers,auth=(settings.COUCH_MASTER_USER_NAME,settings.COUCH_MASTER_USER_PASSWORD))

    if not r.ok:
        raise Exception('error code: ' + str(r.status_code) + ' ,reason: ' + r.reason)
    else:
        dic = json.loads(r._content)
        return (dic['key'],dic['password'])



def _couch_db_grant_cloudant_access_to_api_key(api_key_name,store_id,roles):
    url = 'https://cloudant.com/api/set_permissions'
    prefix = settings.COUCH_MASTER_USER_NAME

    role_str = ""
    for item in roles:
        role_str += ('&roles=' + item)

    db_name = couch_util.get_store_db_name(store_id)
    data_str = 'database=%s/%s&username=%s' % (prefix,db_name,api_key_name)
    data_str += role_str
    headers = {'content-type': 'application/x-www-form-urlencoded'}

    r = requests.post(url,data=data_str,headers=headers,auth=(settings.COUCH_MASTER_USER_NAME,settings.COUCH_MASTER_USER_PASSWORD))    

def _couch_db_insert_view(db):
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
    }""" % (settings.STORE_PRODUCT_DOCUMENT_TYPE,)

    sku_view_map_function = \
    """function(doc) {
      if(doc.d_type == '%s')
      for(var i=0; i<doc.sku_lst.length;i++){
        emit(doc.sku_lst[i], doc);
      }
    }""" % (settings.STORE_PRODUCT_DOCUMENT_TYPE,)

    views = { \
         settings.STORE_DB_VIEW_NAME_BY_PRODUCT_ID:{"map":product_id_view_map_function}
        ,settings.STORE_DB_VIEW_NAME_BY_SKU:{"map":sku_view_map_function}
        ,settings.STORE_DB_VIEW_NAME_BY_D_TYPE:{"map":d_type_view_map_function}
        
    }

    view_doc = {"_id":settings.VIEW_DOCUMENT_ID,"language":"javascript","views":views}
    db.save(view_doc)


def _is_local_env():
    return os.environ.get('LOCAL_ENVIRONMENT') == '1'


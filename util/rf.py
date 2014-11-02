from django.contrib.auth.models import User
from util import couch_util
from couchdb import Server
from product.models import Product,Unit,ProdSkuAssoc,Sku
from store.models import Store
from group.models import Group
from mix_match.models import Mix_match
from model_mommy import mommy

def d():
    print('----------- creating 4 empty stores ----------------')
    delete_data()

    user1,store1=_create_user_then_store_detail(user_name = "1",user_password="1",store_name="1")
    user2,store2=_create_user_then_store_detail(user_name = "2",user_password="2",store_name="2")
    user3,store3=_create_user_then_store_detail(user_name = "3",user_password="3",store_name="3") 
    user4,store4=_create_user_then_store_detail(user_name = "4",user_password="4",store_name="4") 

def _create_user_then_store_detail(user_name,user_password,store_name,tax_rate=8.725):
    #helper: create user belong to that single store
    store = mommy.make('store.Store',name=store_name,tax_rate=tax_rate,couch_admin_name='_',couch_admin_pwrd='_',couch_url='_')
    user = User.objects.create_user(username = user_name,password=user_password,first_name=user_name)
    membership = mommy.make('liqUser.Membership',business=store,user=user)
    return (membership.user,membership.user.business_set.all()[0])

def delete_data():
    Group.objects.all().delete()
    Mix_match.objects.all().delete()    
    Product.objects.all().delete()
    Unit.objects.all().delete()
    ProdSkuAssoc.objects.all().delete()
    User.objects.all().delete()
    Sku.objects.all().delete()
    Store.objects.all().delete()

    url = couch_util.get_couch_access_url()
    server = Server(url)
    for db in server:
        del server[db]




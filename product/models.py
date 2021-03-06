from django.db import models
from django.core.exceptions import MultipleObjectsReturned,ObjectDoesNotExist,ValidationError



class Unit(models.Model):
    name = models.CharField(max_length=100)
    abbreviate = models.CharField(max_length=20)
    is_approved = models.BooleanField()
    _old_id = models.IntegerField(null=True)  
    
    def __unicode__(self):
        return self.abbreviate
    

class Sku(models.Model):
    sku = models.CharField(max_length=30,unique=True)
    creator = models.ForeignKey('store.Store',blank=True,null=True)
    is_approved = models.BooleanField()
    _old_id = models.IntegerField(null=True)  
    def __unicode__(self):
        return self.sku


class ProdSkuAssoc(models.Model):
    sku = models.ForeignKey(Sku)
    product = models.ForeignKey('product.Product')
    creator = models.ForeignKey('store.Store',blank=True,null=True)
    is_approve_override = models.BooleanField()
    store_product_set = models.ManyToManyField('store_product.Store_product')#list of store support this product_sku_assoc 
                                                                            
    
    def _is_dynamic_approve(self,frequency):
        return self.store_product_set.count() == frequency

    def is_approve(self,frequency):
        return self.is_approve_override or self._is_dynamic_approve(frequency)

    def get_store_set(self):
        return [sp.store.id for sp in self.store_product_set.all()]

    def is_deletable(self,store_id):
        return self.store_product_set.count() == 1 and self.creator.id == store_id

    class Meta:
        unique_together = ("sku","product")


class Product(models.Model):
    _name_admin = models.CharField(max_length=255,null=True,blank=True)
    _size_admin = models.CharField(max_length=10,null=True,blank=True)
    _unit_admin = models.ForeignKey(Unit,null=True,blank=True)
    temp_name = models.CharField(max_length=255,blank=True,null=True)
    _old_id = models.IntegerField(null=True)        

    creator = models.ForeignKey('store.Store',null=True,blank=True,related_name='create_product_set')
    sku_set = models.ManyToManyField(Sku,through=ProdSkuAssoc)
    store_set = models.ManyToManyField('store.Store',through='store_product.Store_product',related_name='own_product_set')#list of business that contain this product

    def is_approve(self,frequency):
        result = False
        for prod_sku_assoc in self.prodskuassoc_set.all():
            if prod_sku_assoc.is_approve(frequency):
                result = True
                break
        return result

    def get_store_product(self,store):
        try:
            store_product = self.store_product_set.get(store_id=store.id)
        except ObjectDoesNotExist:
            store_product = None
        return store_product

    def __unicode__(self):
        if self._name_admin:
            ret = self._name_admin
            if self._size_admin: ret += (' ' + self._size_admin)
            if self._unit_admin: ret += (' ' + self._unit_admin.__unicode__())
            return ret
        else:
            return self.temp_name
    
    def clean(self):
        #cleaning field
        self._name_admin = self._name_admin.strip()
        self._size_admin = self._size_admin.strip()
        self.temp_name = self.temp_name.strip()

        #validate
        if not self._name_admin and not self.temp_name:
            raise ValidationError('product need a name')


    
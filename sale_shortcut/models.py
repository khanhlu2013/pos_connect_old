from django.db import models
from store_product.models import Store_product

class Parent(models.Model):
    store = models.ForeignKey('store.Store')
    position = models.IntegerField()
    caption = models.CharField(max_length=30)

    class Meta:
        unique_together = ("store","position")    

        
class Child(models.Model):
    parent = models.ForeignKey(Parent)
    position = models.IntegerField()
    caption = models.CharField(max_length=30)
    store_product = models.ForeignKey(Store_product,blank=True,null=True)

    class Meta:
        unique_together = ("parent","position")    

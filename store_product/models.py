from django.db import models
from bus.models import Business
from product.models import Product    

class Store_product(models.Model):
    product = models.ForeignKey(Product)
    business = models.ForeignKey(Business)
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=6, decimal_places=2,blank=True,null=True)
    crv = models.DecimalField(max_digits=5, decimal_places=3,blank=True,null=True)
    department = models.ForeignKey('product.Department',blank=True,null=True)
    isTaxable = models.BooleanField()
    isTaxReport = models.BooleanField(default=True)
    isSaleReport = models.BooleanField(default=True)
    
    class Meta:
        unique_together = ("product","business")
        
    def __unicode__(self):
        return self.name
    
    def clean(self):
        self.name = self.name.strip()
        if not self.name:
            raise ValidationError("Please provide product's name")
# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Receipt'
        db.create_table(u'sale_receipt', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('time_stamp', self.gf('django.db.models.fields.DateTimeField')()),
            ('collect_amount', self.gf('django.db.models.fields.DecimalField')(max_digits=6, decimal_places=2)),
            ('tax_rate', self.gf('django.db.models.fields.DecimalField')(max_digits=6, decimal_places=4)),
            ('store', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['store.Store'])),
            ('_receipt_doc_id', self.gf('django.db.models.fields.CharField')(unique=True, max_length=40)),
        ))
        db.send_create_signal(u'sale', ['Receipt'])

        # Adding model 'Receipt_ln'
        db.create_table(u'sale_receipt_ln', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('receipt', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['sale.Receipt'])),
            ('qty', self.gf('django.db.models.fields.IntegerField')()),
            ('store_product', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['store_product.Store_product'], null=True, blank=True)),
            ('price', self.gf('django.db.models.fields.DecimalField')(max_digits=6, decimal_places=2)),
            ('crv', self.gf('django.db.models.fields.DecimalField')(null=True, max_digits=6, decimal_places=3, blank=True)),
            ('discount', self.gf('django.db.models.fields.DecimalField')(null=True, max_digits=6, decimal_places=2, blank=True)),
            ('discount_mm_deal', self.gf('django.db.models.fields.DecimalField')(null=True, max_digits=6, decimal_places=2, blank=True)),
            ('non_product_name', self.gf('django.db.models.fields.CharField')(max_length=30, null=True, blank=True)),
            ('is_taxable', self.gf('django.db.models.fields.BooleanField')()),
            ('p_type', self.gf('django.db.models.fields.CharField')(max_length=100, null=True, blank=True)),
            ('p_tag', self.gf('django.db.models.fields.CharField')(max_length=100, null=True, blank=True)),
            ('cost', self.gf('django.db.models.fields.DecimalField')(null=True, max_digits=6, decimal_places=2, blank=True)),
            ('buydown', self.gf('django.db.models.fields.DecimalField')(null=True, max_digits=6, decimal_places=2, blank=True)),
        ))
        db.send_create_signal(u'sale', ['Receipt_ln'])


    def backwards(self, orm):
        # Deleting model 'Receipt'
        db.delete_table(u'sale_receipt')

        # Deleting model 'Receipt_ln'
        db.delete_table(u'sale_receipt_ln')


    models = {
        u'auth.group': {
            'Meta': {'object_name': 'Group'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '80'}),
            'permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'})
        },
        u'auth.permission': {
            'Meta': {'ordering': "(u'content_type__app_label', u'content_type__model', u'codename')", 'unique_together': "((u'content_type', u'codename'),)", 'object_name': 'Permission'},
            'codename': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'content_type': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['contenttypes.ContentType']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        u'auth.user': {
            'Meta': {'object_name': 'User'},
            'date_joined': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'email': ('django.db.models.fields.EmailField', [], {'max_length': '75', 'blank': 'True'}),
            'first_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'groups': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'related_name': "u'user_set'", 'blank': 'True', 'to': u"orm['auth.Group']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'is_staff': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_superuser': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'last_login': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'last_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '128'}),
            'user_permissions': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'related_name': "u'user_set'", 'blank': 'True', 'to': u"orm['auth.Permission']"}),
            'username': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '30'})
        },
        u'bus.business': {
            'Meta': {'object_name': 'Business'},
            'city': ('django.db.models.fields.CharField', [], {'max_length': '255', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'state': ('django.db.models.fields.CharField', [], {'max_length': '2', 'blank': 'True'}),
            'street': ('django.db.models.fields.CharField', [], {'max_length': '255', 'blank': 'True'}),
            'user_set': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['auth.User']", 'through': u"orm['liqUser.Membership']", 'symmetrical': 'False'}),
            'zip_code': ('django.db.models.fields.IntegerField', [], {'max_length': '5', 'null': 'True', 'blank': 'True'})
        },
        u'contenttypes.contenttype': {
            'Meta': {'ordering': "('name',)", 'unique_together': "(('app_label', 'model'),)", 'object_name': 'ContentType', 'db_table': "'django_content_type'"},
            'app_label': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'model': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'})
        },
        u'group.group': {
            'Meta': {'object_name': 'Group'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'store': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['store.Store']"})
        },
        u'liqUser.membership': {
            'Meta': {'object_name': 'Membership'},
            'business': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['bus.Business']"}),
            'date_join': ('django.db.models.fields.DateField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']"})
        },
        u'product.prodskuassoc': {
            'Meta': {'unique_together': "(('sku', 'product'),)", 'object_name': 'ProdSkuAssoc'},
            'creator': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['store.Store']", 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_approve_override': ('django.db.models.fields.BooleanField', [], {}),
            'product': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['product.Product']"}),
            'sku': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['product.Sku']"}),
            'store_product_set': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['store_product.Store_product']", 'symmetrical': 'False'})
        },
        u'product.product': {
            'Meta': {'object_name': 'Product'},
            '_name_admin': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            '_old_id': ('django.db.models.fields.IntegerField', [], {'null': 'True'}),
            '_size_admin': ('django.db.models.fields.CharField', [], {'max_length': '10', 'null': 'True', 'blank': 'True'}),
            '_unit_admin': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['product.Unit']", 'null': 'True', 'blank': 'True'}),
            'creator': ('django.db.models.fields.related.ForeignKey', [], {'blank': 'True', 'related_name': "'create_product_set'", 'null': 'True', 'to': u"orm['store.Store']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'sku_set': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['product.Sku']", 'through': u"orm['product.ProdSkuAssoc']", 'symmetrical': 'False'}),
            'store_set': ('django.db.models.fields.related.ManyToManyField', [], {'related_name': "'own_product_set'", 'symmetrical': 'False', 'through': u"orm['store_product.Store_product']", 'to': u"orm['store.Store']"}),
            'temp_name': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'})
        },
        u'product.sku': {
            'Meta': {'object_name': 'Sku'},
            '_old_id': ('django.db.models.fields.IntegerField', [], {'null': 'True'}),
            'creator': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['store.Store']", 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_approved': ('django.db.models.fields.BooleanField', [], {}),
            'sku': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '30'})
        },
        u'product.unit': {
            'Meta': {'object_name': 'Unit'},
            '_old_id': ('django.db.models.fields.IntegerField', [], {'null': 'True'}),
            'abbreviate': ('django.db.models.fields.CharField', [], {'max_length': '20'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_approved': ('django.db.models.fields.BooleanField', [], {}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'})
        },
        u'sale.receipt': {
            'Meta': {'object_name': 'Receipt'},
            '_receipt_doc_id': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '40'}),
            'collect_amount': ('django.db.models.fields.DecimalField', [], {'max_digits': '6', 'decimal_places': '2'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'store': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['store.Store']"}),
            'tax_rate': ('django.db.models.fields.DecimalField', [], {'max_digits': '6', 'decimal_places': '4'}),
            'time_stamp': ('django.db.models.fields.DateTimeField', [], {})
        },
        u'sale.receipt_ln': {
            'Meta': {'object_name': 'Receipt_ln'},
            'buydown': ('django.db.models.fields.DecimalField', [], {'null': 'True', 'max_digits': '6', 'decimal_places': '2', 'blank': 'True'}),
            'cost': ('django.db.models.fields.DecimalField', [], {'null': 'True', 'max_digits': '6', 'decimal_places': '2', 'blank': 'True'}),
            'crv': ('django.db.models.fields.DecimalField', [], {'null': 'True', 'max_digits': '6', 'decimal_places': '3', 'blank': 'True'}),
            'discount': ('django.db.models.fields.DecimalField', [], {'null': 'True', 'max_digits': '6', 'decimal_places': '2', 'blank': 'True'}),
            'discount_mm_deal': ('django.db.models.fields.DecimalField', [], {'null': 'True', 'max_digits': '6', 'decimal_places': '2', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_taxable': ('django.db.models.fields.BooleanField', [], {}),
            'non_product_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'null': 'True', 'blank': 'True'}),
            'p_tag': ('django.db.models.fields.CharField', [], {'max_length': '100', 'null': 'True', 'blank': 'True'}),
            'p_type': ('django.db.models.fields.CharField', [], {'max_length': '100', 'null': 'True', 'blank': 'True'}),
            'price': ('django.db.models.fields.DecimalField', [], {'max_digits': '6', 'decimal_places': '2'}),
            'qty': ('django.db.models.fields.IntegerField', [], {}),
            'receipt': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['sale.Receipt']"}),
            'store_product': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['store_product.Store_product']", 'null': 'True', 'blank': 'True'})
        },
        u'store.store': {
            'Meta': {'object_name': 'Store', '_ormbases': [u'bus.Business']},
            'api_key_name': ('django.db.models.fields.CharField', [], {'max_length': '25', 'blank': 'True'}),
            'api_key_pwrd': ('django.db.models.fields.CharField', [], {'max_length': '25', 'blank': 'True'}),
            u'business_ptr': ('django.db.models.fields.related.OneToOneField', [], {'to': u"orm['bus.Business']", 'unique': 'True', 'primary_key': 'True'}),
            'tax_rate': ('django.db.models.fields.DecimalField', [], {'max_digits': '5', 'decimal_places': '3'})
        },
        u'store_product.store_product': {
            'Meta': {'unique_together': "(('product', 'store'),)", 'object_name': 'Store_product'},
            'buydown': ('django.db.models.fields.DecimalField', [], {'null': 'True', 'max_digits': '6', 'decimal_places': '2', 'blank': 'True'}),
            'cost': ('django.db.models.fields.DecimalField', [], {'null': 'True', 'max_digits': '6', 'decimal_places': '2', 'blank': 'True'}),
            'crv': ('django.db.models.fields.DecimalField', [], {'null': 'True', 'max_digits': '6', 'decimal_places': '3', 'blank': 'True'}),
            'group_set': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['group.Group']", 'symmetrical': 'False'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_sale_report': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'is_taxable': ('django.db.models.fields.BooleanField', [], {}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'p_tag': ('django.db.models.fields.CharField', [], {'max_length': '100', 'null': 'True', 'blank': 'True'}),
            'p_type': ('django.db.models.fields.CharField', [], {'max_length': '100', 'null': 'True', 'blank': 'True'}),
            'price': ('django.db.models.fields.DecimalField', [], {'max_digits': '6', 'decimal_places': '2'}),
            'product': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['product.Product']"}),
            'store': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['store.Store']"}),
            'vendor': ('django.db.models.fields.CharField', [], {'max_length': '100', 'null': 'True', 'blank': 'True'})
        }
    }

    complete_apps = ['sale']
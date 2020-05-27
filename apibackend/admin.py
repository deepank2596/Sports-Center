from django.contrib import admin
from .models import Products,Customer,Cart

# Register your models here.
 
class CartInLine(admin.StackedInline):
    model = Cart
    extra = 0

@admin.register(Products)
class ProductAdmin(admin.ModelAdmin):
    list_display=('id', 'name', 'price', 'image', 'description')

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display=('id', 'user', 'mobile', 'address', '_orders')
    inlines =[CartInLine]

    def _orders(self, obj):
        return obj.carts.count()

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display=('id', 'user', 'product')


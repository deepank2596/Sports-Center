from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.

class Customer (models.Model):
    user = models.OneToOneField(User,on_delete= models.CASCADE)
    mobile = models.CharField(max_length=14, blank=False)
    address = models.TextField(max_length=200)
    class Meta:
        db_table="Customer"
    def __str__(self):
        return "\nName : {0} \nMobile : {1}\nAddress : {2}\n".format(self.user.username,self.mobile,self.address)

    @property
    def carts(self):
        return self.cart.all()


@receiver(post_save,sender=User)
def create_user_customer(sender, instance, created, **kwargs):
    if created:
        Customer.objects.create(user=instance)

@receiver(post_save, sender= User)
def save_user_customer(sender, instance, **kwargs):
    instance.customer.save()
 


class Products (models.Model):
    name= models.CharField(max_length=200,blank=False)
    price= models.FloatField(blank=False)
    image = models.ImageField(upload_to='picture/%Y/%m/%d/',max_length=255,null=True)
    description = models.TextField(blank=True)

    class Meta:
        db_table="Products"
    
    def __str__(self):
        return "Name : {0} \nPrice : {1}".format(self.name, self.price)
    
    



class Cart(models.Model):
    user = models.ForeignKey(Customer, related_name= 'cart', on_delete= models.CASCADE)
    product = models.ForeignKey(Products,on_delete=models.DO_NOTHING)

    class Meta:
        db_table = 'Cart'
    
    def __str__(self):
        return "\n ID : {0}\n Product : {1}\n".format(self.id,self.product)

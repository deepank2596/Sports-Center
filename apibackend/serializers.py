from rest_framework import serializers
from .models import Products, Customer, Cart
from django.contrib.auth.models import User
from django.contrib.auth import authenticate


class ProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Products
        fields = ('id', 'name', 'price', 'image', 'description', 'url',)


class RegisterUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('username','email','password')
        extra_kwargs = {'password':{'write_only':True}}

    
    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'],validated_data['email'],validated_data['password'])
        return user



        
class CartSerializer(serializers.HyperlinkedModelSerializer):
    product = ProductSerializer()
    class Meta:
        model = Cart
        fields = ['user','product']
     



class CustomerSerializer(serializers.HyperlinkedModelSerializer):
    user = RegisterUserSerializer()
    #cart = CartSerializer(many=True, read_only=True)
    class Meta:
        model = Customer
        fields = ('id','url','user', 'mobile', 'address',)

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = RegisterUserSerializer.create(RegisterUserSerializer(),validated_data=user_data)#User.objects.create_user(user_data['username'],user_data['email'],user_data['password'])
        user.customer.mobile = validated_data['mobile']
        user.customer.address = validated_data['address']
        user.save()
        #customer = Customer.objects.update_or_create(user=user,mobile=validated_data['mobile'],address=validated_data['address'])#user.customer
        return user.customer


        
class CartSerializer(serializers.HyperlinkedModelSerializer):
    #user = CustomerSerializer()
    product = ProductSerializer()
    class Meta:
        model = Cart
        fields = ['id','product']
    


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")


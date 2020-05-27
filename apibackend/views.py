from django.shortcuts import render
from rest_framework import viewsets, generics, permissions
from rest_framework.response import Response
from .models import Products, Customer, Cart
from .serializers import ProductSerializer, CustomerSerializer, LoginSerializer,CartSerializer
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters
from knox.models import AuthToken
from rest_framework.parsers import FileUploadParser
from rest_framework import status
# Create your views here.

#Get User API
class CustomerAPI (generics.RetrieveAPIView):
    permission_classes=[
        permissions.IsAuthenticated
    ]
    serializer_class= CustomerSerializer

    def get_object(self):
        return self.request.user.customer

#Login View
class LoginAPI (generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        user = serializer.validated_data
        return Response({
            "customer": CustomerSerializer(user.customer, context = self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
            })
    
#Register Customer API View
class RegisterAPI (generics.GenericAPIView):
    serializer_class = CustomerSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception= True)
        customer = serializer.save()
        return Response({
            "user": CustomerSerializer(customer, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(customer.user)[1]
        })



class ProductFilter(filters.FilterSet):
    min_price = filters.NumberFilter(field_name="price", lookup_expr='gte')
    max_price = filters.NumberFilter(field_name="price", lookup_expr='lte')

    class Meta:
        model = Products
        fields = ['name', 'min_price', 'max_price']

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend]
    filter_class = ProductFilter
    permission_classes = [ permissions.IsAuthenticated ]

class CartViewSet(viewsets.ModelViewSet):
    parser_class = (FileUploadParser,)
    serializer_class = CartSerializer
    permission_classes = [ permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Cart.objects.filter(user__id=self.request.user.customer.id)

    def create(self,request, *args, **kwargs):
        data = request.data
        product_data = data.pop('product')
        product = Products.objects.get(id= product_data['id'])
        cart = Cart(user=self.request.user.customer,product=product)
        cart.save()
        return Response(CartSerializer(cart, context = self.get_serializer_context()).data, status=status.HTTP_201_CREATED)


class CustomerViewSet(viewsets.ModelViewSet):
    serializer_class = CustomerSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ('user__username',)
    permission_classes = [ permissions.IsAuthenticated]

    def get_queryset(self):
        return Customer.objects.filter(user=self.request.user)




    

    

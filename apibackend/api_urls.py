from django.urls import path, include
from rest_framework import routers
from .views import ProductViewSet,CustomerViewSet,CartViewSet

router = routers.DefaultRouter()
router.register(r'products',ProductViewSet)
router.register(r'customers',CustomerViewSet,basename='customer')
router.register(r'cart',CartViewSet,basename="cart")


urlpatterns=[
    path('',include(router.urls)),
]
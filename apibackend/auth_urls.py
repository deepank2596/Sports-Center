from django.urls import path, include
from .views import LoginAPI, RegisterAPI,CustomerAPI
from knox import views as knox_views

urlpatterns=[
    path('api/auth',include('knox.urls')),
    path('api/auth/login',LoginAPI.as_view()),
    path('api/auth/register',RegisterAPI.as_view()),
    path('api/auth/customer',CustomerAPI.as_view()),
    path('api/auth/logout',knox_views.LogoutView.as_view(),name='knox_logout')
]
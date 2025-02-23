from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('logout/', views.logout_user, name='logout'),
    path('register/', views.register_user, name='register'),
    path('register-company/', views.register_company, name='register_company'),
    path('user-profile/', views.user_profile, name='user_profile'),
    # path('register-company-user/', views.register_company_user, name='register_company_user'),
    
    path('product/', views.product, name='product'),
    path('add_product/', views.add_product, name='add_product'),
    path('product/<prod>', views.product_detail, name='product_detail'),
    
    path('customer/', views.customer, name='customer'),
    path('add_customer/', views.add_customer, name='add_customer'),
    path('customer/<cust>', views.customer_detail, name='customer_detail'),
    path('delete_customer/<cust>', views.delete_customer, name='delete_customer'),
    
    path('estimate/', views.estimate, name='estimate'),

]

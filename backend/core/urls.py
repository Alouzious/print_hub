"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
]

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from orders.views import OrderCreateView, VerifyPaymentView, AdminOrderListView, AgentOrderListView
from accounts.views import RegisterView, LoginView, UserListView
from rest_framework.authtoken.views import obtain_auth_token
from orders.views import OrderCreateView, VerifyPaymentView, AdminOrderListView, AgentOrderListView, OrderStatusUpdateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/orders/<int:pk>/status/', OrderStatusUpdateView.as_view(), name='order-status-update'),

    
    # Orders
    path('api/orders/create/', OrderCreateView.as_view(), name='order-create'),
    path('api/orders/verify/', VerifyPaymentView.as_view(), name='verify-payment'),
    path('api/orders/admin/', AdminOrderListView.as_view(), name='admin-orders'),
    path('api/orders/agent/<int:station_id>/', AgentOrderListView.as_view(), name='agent-orders'),
    
    # Authentication
    path('api/auth/register/', RegisterView.as_view(), name='auth-register'),
    path('api/auth/login/', LoginView.as_view(), name='auth-login'),
    path('api/auth/users/', UserListView.as_view(), name='user-list'),
    path('api/auth/token/', obtain_auth_token, name='api_token_auth'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


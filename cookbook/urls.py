from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/bank/', include('bank.urls')),
    path('api/authorization/', include('authorization.urls')),
    path('api/store/', include('store.urls')),
]

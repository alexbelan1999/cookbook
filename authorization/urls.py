from django.urls import path

from .views import roles_list, roles_detail, users_list, users_detail, get_accounts

app_name = "authorization"

urlpatterns = [
    path('roles/', roles_list),
    path('roles/<int:pk>', roles_detail),
    path('users/', users_list),
    path('users/<int:pk>', users_detail),
    path('accounts/', get_accounts),
]

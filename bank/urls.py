from django.urls import path
from .views import accounts_detail, accounts_list, transfers_list, transfers_detail
app_name = "bank"

urlpatterns = [
    path('accounts/', accounts_list),
    path('accounts/<int:pk>', accounts_detail),
    path('transfers/', transfers_list),
    path('transfers/<int:pk>', transfers_detail),
]

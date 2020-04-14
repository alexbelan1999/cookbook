from django.urls import path
from .views import store_detail, store_list, get_ingredient
app_name = "store"

urlpatterns = [
    path('product/', store_list),
    path('product/<int:pk>', store_detail),
    path('ingredient/', get_ingredient),
]

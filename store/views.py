from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
import requests as req
from rest_framework.generics import get_object_or_404
from .models import Store
from .serializers import StoreSerializer

@api_view(['GET'])
def get_ingredient(request):
    response = req.get('http://127.0.0.1/cookbook/api/ingredient/read.php')
    json = response.json()
    return Response(json)

@api_view(['GET', 'POST'])
def store_list(request):
    if request.method == 'GET':
        store = Store.objects.all()
        serializer = StoreSerializer(store, many=True)
        return Response({"store": serializer.data})

    elif request.method == 'POST':
        store = request.data.get('store')
        serializer = StoreSerializer(data=store)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({"store": serializer.data}, status=status.HTTP_201_CREATED)
        return Response({"store": serializer.data}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def store_detail(request, pk):
    try:
        product = Store.objects.get(pk=pk)
    except Store.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = StoreSerializer(product)
        return Response(serializer.data)

    elif request.method == 'PUT':
        saved_product = get_object_or_404(Store.objects.all(), pk=pk)
        store = request.data.get('store')
        serializer = StoreSerializer(instance=saved_product, data=store, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
import requests as req
from .models import Roles, Users
from .serializers import RolesSerializer, UsersSerializer

@api_view(['GET'])
def get_accounts(request):
    response = req.get('http://127.0.0.1:8000/api/bank/accounts/')
    json = response.json()
    return Response(json)

@api_view(['GET', 'POST'])
def roles_list(request):
    if request.method == 'GET':
        roles = Roles.objects.all()
        serializer = RolesSerializer(roles, many=True)
        return Response({"roles": serializer.data})

    elif request.method == 'POST':
        roles = request.data.get('roles')
        serializer = RolesSerializer(data=roles)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def roles_detail(request, pk):
    try:
        role = Roles.objects.get(pk=pk)
    except Roles.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = RolesSerializer(role)
        return Response(serializer.data)

    elif request.method == 'PUT':
        saved_role = get_object_or_404(Roles.objects.all(), pk=pk)
        roles = request.data.get('roles')
        serializer = RolesSerializer(instance=saved_role, data=roles, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        role.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def users_list(request):
    if request.method == 'GET':
        users = Users.objects.all()
        serializer = UsersSerializer(users, many=True)
        return Response({"users": serializer.data})

    elif request.method == 'POST':
        users = request.data.get('users')
        serializer = UsersSerializer(data=users)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({"users": serializer.data}, status=status.HTTP_201_CREATED)
        return Response({"users": serializer.data}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def users_detail(request, pk):
    try:
        user = Users.objects.get(pk=pk)
    except Users.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UsersSerializer(user)
        return Response(serializer.data)

    elif request.method == 'PUT':
        saved_user = get_object_or_404(Users.objects.all(), pk=pk)
        users = request.data.get('users')
        serializer = UsersSerializer(instance=saved_user, data=users, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from .models import Account, Transfers
from .serializers import AccountSerializer, TransferSerializer


@api_view(['GET', 'POST'])
def accounts_list(request):
    if request.method == 'GET':
        accounts = Account.objects.all()
        serializer = AccountSerializer(accounts, many=True)
        return Response({"accounts": serializer.data})

    elif request.method == 'POST':
        accounts = request.data.get('accounts')
        serializer = AccountSerializer(data=accounts)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({"accounts": serializer.data}, status=status.HTTP_201_CREATED)
        return Response({"accounts": serializer.data}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def accounts_detail(request, pk):
    try:
        account = Account.objects.get(pk=pk)
    except Account.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = AccountSerializer(account)
        return Response(serializer.data)

    elif request.method == 'PUT':
        saved_account = get_object_or_404(Account.objects.all(), pk=pk)
        accounts = request.data.get('accounts')
        serializer = AccountSerializer(instance=saved_account, data=accounts, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        account.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def transfers_list(request):
    if request.method == 'GET':
        transfers = Transfers.objects.all()
        serializer = TransferSerializer(transfers, many=True)
        return Response({"transfers": serializer.data})

    elif request.method == 'POST':
        transfers = request.data.get('transfers')
        serializer = TransferSerializer(data=transfers)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({"transfers": serializer.data}, status=status.HTTP_201_CREATED)
        return Response({"transfers": serializer.data}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def transfers_detail(request, pk):
    try:
        transfer = Transfers.objects.get(pk=pk)
    except Transfers.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = TransferSerializer(transfer)
        return Response(serializer.data)

    elif request.method == 'PUT':
        saved_transfer = get_object_or_404(Transfers.objects.all(), pk=pk)
        transfers = request.data.get('transfers')
        serializer = TransferSerializer(instance=saved_transfer, data=transfers, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        transfer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

from rest_framework import serializers

from .models import Account, Transfers

class AccountSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    card_number = serializers.IntegerField()
    csv = serializers.IntegerField()
    balance = serializers.FloatField()

    def create(self, validated_data):
        return Account.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.id = validated_data.get('id', instance.id)
        instance.card_number = validated_data.get('card_number', instance.card_number)
        instance.csv = validated_data.get('csv', instance.csv)
        instance.balance = validated_data.get('balance', instance.balance)
        instance.save()
        return instance

class TransferSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    sender_id = serializers.IntegerField()
    recipient_id = serializers.IntegerField()
    sum = serializers.FloatField()
    transfer_time = serializers.DateTimeField()

    def create(self, validated_data):
        return Transfers.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.id = validated_data.get('id', instance.id)
        instance.sender_id = validated_data.get('sender_id', instance.sender_id)
        instance.recipient_id = validated_data.get('recipient_id', instance.recipient_id)
        instance.sum = validated_data.get('sum', instance.sum)
        instance.transfer_time = validated_data.get('transfer_time', instance.transfer_time)
        instance.save()
        return instance
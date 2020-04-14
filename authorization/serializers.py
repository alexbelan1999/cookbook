from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Users, Roles


class RolesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Roles
        fields = ('id','name')

class UsersSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    surname = serializers.CharField(max_length=25)
    name = serializers.CharField(max_length=25)
    patronymic = serializers.CharField(allow_null=True, max_length=25)
    login = serializers.CharField(max_length=50)
    password = serializers.CharField(max_length=50)
    account_id = serializers.IntegerField()
    role_id = serializers.IntegerField()

    def create(self, validated_data):
        return Users.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.id = validated_data.get('id', instance.id)
        instance.surname = validated_data.get('surname', instance.surname)
        instance.name = validated_data.get('name', instance.name)
        instance.patronymic = validated_data.get('patronymic', instance.patronymic)
        instance.login = validated_data.get('login', instance.login)
        instance.password = validated_data.get('password', instance.password)
        instance.account_id = validated_data.get('account_id', instance.account_id)
        instance.role_id = validated_data.get('role_id', instance.role_id)
        instance.save()
        return instance
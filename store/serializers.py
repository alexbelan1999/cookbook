from rest_framework import serializers

from .models import Store

class StoreSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    ingredient_id = serializers.IntegerField()
    price = serializers.FloatField()
    picture = serializers.CharField(max_length=500)

    def create(self, validated_data):
        return Store.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.id = validated_data.get('id', instance.id)
        instance.ingredient_id = validated_data.get('ingredient_id', instance.ingredient_id)
        instance.price = validated_data.get('price', instance.price)
        instance.picture = validated_data.get('picture', instance.picture)
        instance.save()
        return instance

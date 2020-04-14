from django.db import models

class Ingredient(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=25)
    calorie = models.IntegerField()
    protein = models.FloatField()
    fat = models.FloatField()
    carbohydrates = models.FloatField()

    class Meta:
        managed = False
        db_table = 'ingredient'
        
class Store(models.Model):
    id = models.IntegerField(primary_key=True)
    ingredient = models.ForeignKey(Ingredient, models.DO_NOTHING)
    price = models.FloatField()
    picture = models.CharField(max_length=500)

    class Meta:
        managed = False
        db_table = 'store'
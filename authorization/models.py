from django.db import models
from bank.models import Account

class Roles(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=25)

    class Meta:
        managed = False
        db_table = 'roles'

class Users(models.Model):
    id = models.IntegerField(primary_key=True)
    surname = models.CharField(max_length=25)
    name = models.CharField(max_length=25)
    patronymic = models.CharField(max_length=25, blank=True, null=True)
    login = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    account = models.ForeignKey(Account, models.DO_NOTHING)
    role = models.ForeignKey(Roles, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'users'

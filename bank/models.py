from django.db import models

class Account(models.Model):
    id = models.IntegerField(primary_key=True)
    card_number = models.IntegerField()
    csv = models.IntegerField()
    balance = models.FloatField()

    class Meta:
        managed = False
        db_table = 'account'

class Transfers(models.Model):
    id = models.IntegerField(primary_key=True)
    sender = models.ForeignKey(Account, models.DO_NOTHING, related_name="sender")
    recipient = models.ForeignKey(Account, models.DO_NOTHING, related_name="recipient")
    sum = models.FloatField()
    transfer_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = False
        db_table = 'transfers'
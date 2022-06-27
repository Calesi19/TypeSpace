from django.db import models

# Create your models here.
class WordBank(models.Model):
    word = models.CharField(max_length=40)

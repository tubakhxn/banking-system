# BankSwiftBackend/models.py

from django.db import models

class Customer(models.Model):
    CustomerID = models.IntegerField(primary_key=True)
    Name = models.CharField(max_length=100)
    Email = models.EmailField()
    Phone = models.CharField(max_length=20)
    Address = models.CharField(max_length=255)
    AccountBalance = models.IntegerField()
    CurrentBalance = models.CharField(max_length=20)

    class Meta:
        app_label = 'BankSwiftBackend'  # Replace 'myapp' with the name of your Django app

    def __str__(self):
        return self.Name

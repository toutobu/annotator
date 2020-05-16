from django.db import models
from django.utils.timezone import now


class Reference(models.Model):
    """A reference source of examples."""
    id = models.CharField(primary_key=True, max_length=128)
    created_date = models.DateTimeField(default=now)
    updated_date = models.DateTimeField(auto_now=True)


class Example(models.Model):
    """An example of business mails."""
    id = models.CharField(primary_key=True, max_length=128)
    reference = models.ForeignKey(Reference, on_delete=models.CASCADE)
    url = models.CharField(max_length=256, default='')
    hash = models.CharField(max_length=64, default='')
    title = models.CharField(max_length=256, default='')
    content = models.TextField(default='')
    fetched_date = models.DateTimeField()
    created_date = models.DateTimeField(default=now)
    updated_date = models.DateTimeField(auto_now=True)

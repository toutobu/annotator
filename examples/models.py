from django.db import models


class Example(models.Model):
    id = models.CharField(primary_key=True, max_length=128)
    url = models.CharField(max_length=256, default='')
    hash = models.CharField(max_length=64, default='')
    title = models.CharField(max_length=256, default='')
    content = models.TextField(default='')
    fetched_date = models.DateTimeField()

    def __str__(self):
        return {'id': self.id, 'title': self.title}

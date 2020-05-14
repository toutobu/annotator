from django.db import models


# class User(models.Model):
#     pass


class Example(models.Model):
    id = models.CharField(primary_key=True, max_length=128)
    url = models.CharField(max_length=256)
    hash = models.CharField(max_length=64)
    title = models.CharField(max_length=256)
    content = models.TextField()
    fetched_date = models.DateTimeField()

    def __str__(self):
        return self.id


# class AnnotatedExample(models.Model):
#     pass

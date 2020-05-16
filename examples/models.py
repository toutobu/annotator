from django.contrib.auth.models import User
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
    annotators = models.ManyToManyField(User, through='Annotation')
    url = models.CharField(max_length=256, default='')
    hash = models.CharField(max_length=64, default='')
    title = models.CharField(max_length=256, default='')
    content = models.TextField(default='')
    fetched_date = models.DateTimeField()
    created_date = models.DateTimeField(default=now)
    updated_date = models.DateTimeField(auto_now=True)


class Annotation(models.Model):
    """An annotation which a user gives to an example."""
    example = models.ForeignKey(Example, on_delete=models.CASCADE)
    annotated_by = models.ForeignKey(User, on_delete=models.CASCADE)
    # TODO: アノテーション情報を保持するカラムの追加
    # See: https://sites.google.com/site/naisttextcorpus/ntc-annotation-scheme
    # 最低、述語と、述語と各関係にある補語(ヲ格・ガ格・ニ格)の対の集合の情報が必要となる
    # 多分、Example.content の形態素単位に前述のアノテート情報(タグ)が付与された
    # データ構造になると思う、json 形式かな？？
    created_date = models.DateTimeField(default=now)
    updated_date = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['example', 'annotated_by']

    def __str__(self):
        return '{}, Example: {}, Annotated By: {}'.format(
            self.id, self.example.id, self.annotated_by.username)

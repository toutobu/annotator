from django.core import serializers
from django.http import HttpResponse

from examples.models import Example


def index(request):
    examples = Example.objects.all()
    fields = ('id', 'url', 'title')
    return HttpResponse(serializers.serialize('json', examples, fields=fields))

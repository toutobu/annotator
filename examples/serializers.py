from rest_framework import serializers

from examples.models import Example


class ExampleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Example
        fields = ['id', 'url', 'title']

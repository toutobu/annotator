import logging
from rest_framework import serializers

from examples.models import Annotation, Example


logger = logging.getLogger(__name__)


class AnnotationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Annotation
        fields = ['id', 'content', 'created_date', 'updated_date']


class ExampleSerializer(serializers.ModelSerializer):
    annotation = AnnotationSerializer(
        source='annotation_set', many=True, read_only=True)

    class Meta:
        model = Example
        fields = ['id', 'url', 'title', 'annotation']

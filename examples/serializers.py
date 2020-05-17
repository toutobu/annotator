import logging
from rest_framework import serializers

from examples.models import Annotation, Example
from molpheme import analyzed


logger = logging.getLogger(__name__)


class AnnotationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Annotation
        fields = ['id', 'content', 'created_date', 'updated_date']


class MorphemeSerializer(serializers.Serializer):
    surface = serializers.CharField(max_length=128)
    pos = serializers.CharField(max_length=32)
    subpos1 = serializers.CharField(max_length=32)
    original_form = serializers.CharField(max_length=128)


class ExampleSerializer(serializers.ModelSerializer):
    morphemes = serializers.SerializerMethodField()
    annotation = AnnotationSerializer(
        source='annotation_set', many=True, read_only=True)

    class Meta:
        model = Example
        fields = ['id', 'url', 'title', 'annotation', 'morphemes']

    def __init__(self, *args, **kwargs):
        # Don't pass the 'excluded_fields' arg up to the superclass
        excluded_fields = kwargs.pop('excluded_fields', None)

        # Instantiate the superclass normally
        super(ExampleSerializer, self).__init__(*args, **kwargs)

        # Exclude fields in 'excluded_fields'.
        if excluded_fields is not None:
            for field_name in excluded_fields:
                self.fields.pop(field_name)

    def get_morphemes(self, obj):
        return [MorphemeSerializer(m).data for m in analyzed(obj.content)]

import logging
from django.db.models import Prefetch
from rest_framework import viewsets
from rest_framework.response import Response

from examples import permissions
from examples.models import Annotation, Example
from examples.serializers import ExampleSerializer


logger = logging.getLogger(__name__)


class ExampleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Example.objects.all()
    serializer_class = ExampleSerializer
    permission_classes = [permissions.ReadExamplesScope]

    def get_queryset(self):
        # loogged in user の Annotation をマージした Example を返却する
        annotations = (
            Annotation.objects
            .prefetch_related('annotated_by')
            .filter(annotated_by=self.request.user))
        return (Example.objects
                .prefetch_related(Prefetch(
                    'annotation_set', queryset=annotations)))

    def get_serializer(self, *args, **kwargs):
        if self.action == 'list':
            # morphemes は計算コストが高いので一覧には含めない
            kwargs['excluded_fields'] = ('morphemes',)
        return ExampleSerializer(*args, **kwargs)

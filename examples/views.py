import logging
from rest_framework import viewsets

from examples import permissions
from examples.models import Example
from examples.serializers import ExampleSerializer


logger = logging.getLogger(__name__)


class IndexViewSet(viewsets.ModelViewSet):
    queryset = Example.objects.all()
    serializer_class = ExampleSerializer
    permission_classes = [permissions.ReadExamplesScope]

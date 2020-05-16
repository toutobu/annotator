from django.urls import include, path
from rest_framework import routers

from examples import views


router = routers.DefaultRouter()
router.register(r'examples', views.ExampleViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

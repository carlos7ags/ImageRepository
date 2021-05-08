from imagemanager.models import Image
from imagemanager.serializers import ImageSerializer

from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions
from rest_framework.parsers import MultiPartParser, FormParser


class ImageViewSet(ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer

    permission_classes = (permissions.AllowAny,)
    parser_classes = (MultiPartParser, FormParser)

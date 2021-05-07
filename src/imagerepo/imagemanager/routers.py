from rest_framework import routers
from imagemanager.viewsets import ImageViewSet


router = routers.DefaultRouter()
router.register(r"image", ImageViewSet)

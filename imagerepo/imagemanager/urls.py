from django.urls import path, include
from imagemanager.routers import router


urlpatterns = [
    path("api/", include((router.urls, "imagemanager"))),
]

import os
from uuid import uuid4

from django.db import models

from imagemanager.constants import CONTENT_TYPE


def path_and_rename(instance, filename):
    upload_to = "img"
    ext = filename.split(".")[-1]
    filename = "{}.{}".format(uuid4().hex, ext)
    return os.path.join(upload_to, filename)


class Image(models.Model):
    image_id = models.AutoField(primary_key=True)
    image = models.ImageField(upload_to=path_and_rename, max_length=255)
    owner = models.TextField(null=True, max_length=255)
    title = models.TextField(null=True, max_length=255)
    description = models.TextField(null=True, max_length=255)
    album = models.TextField(null=True, max_length=255)
    tags = models.TextField(null=True, max_length=255)
    is_public = models.BooleanField(default=False)
    content_type = models.CharField(max_length=20, choices=CONTENT_TYPE, default="1")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.image.name)

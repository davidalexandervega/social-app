from distutils.text_file import TextFile
import uuid
from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.

class User(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  username = models.CharField(max_length=20)
  password = models.CharField(max_length=20)
  picture = models.CharField(max_length=255)
  banner = models.CharField(max_length=255)
  bio = models.CharField(max_length=200)
  following = ArrayField(base_field=models.UUIDField())
  followers = ArrayField(base_field=models.UUIDField())

class Post(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  body = models.CharField(max_length=200)
  time = models.DateTimeField()
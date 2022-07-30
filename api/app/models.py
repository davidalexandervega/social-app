from distutils.text_file import TextFile
import uuid
from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.

from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import UserManager

# since the default AUTH_USER has been overridden in settings.py,
# this user must extend AbstractBaseUser as well as PermissionsMixin.
# the username and email fields are standard here, which is necessary,
# if the default UserManager is to be utilized.
# finally, USERNAME_FIELD must be specified.
# the final steps in overriding the default user are in admin.py.
class User(AbstractBaseUser, PermissionsMixin):
  id = models.UUIDField(primary_key=True)
  email = models.CharField(max_length=765)
  username = models.CharField(max_length=765, blank=True, unique=True)
  password = models.CharField(max_length=255)
  picture = models.CharField(max_length=255, blank=True)
  banner = models.CharField(max_length=255, blank=True)
  bio = models.CharField(max_length=200, blank=True)
  following = ArrayField(base_field=models.UUIDField(), blank=True)
  followers = ArrayField(base_field=models.UUIDField(), blank=True)
  USERNAME_FIELD = 'username'
  objects = UserManager()

class Post(models.Model):
  id = models.UUIDField(primary_key=True)
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  image = models.CharField(max_length=255, blank=True)
  body = models.CharField(max_length=200)
  time = models.DateTimeField()
  likes = ArrayField(base_field=models.UUIDField(), blank=True)
  replies = ArrayField(base_field=models.UUIDField(), blank=True)

class Reply(models.Model):
  id = models.UUIDField(primary_key=True)
  origin = models.ForeignKey(Post, on_delete=models.CASCADE)
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  image = models.CharField(max_length=255, blank=True)
  body = models.CharField(max_length=200)
  time = models.DateTimeField()
  likes = ArrayField(base_field=models.UUIDField(), blank=True)
  
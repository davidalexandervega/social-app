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
  created = models.DateTimeField()
  email = models.CharField(max_length=765)
  username = models.CharField(max_length=765, blank=True, unique=True)
  password = models.CharField(max_length=255)
  picture = models.BooleanField(default=False)
  banner = models.BooleanField(default=False)
  bio = models.CharField(max_length=200, blank=True)
  following = ArrayField(base_field=models.UUIDField(), blank=True)
  followers = ArrayField(base_field=models.UUIDField(), blank=True)
  USERNAME_FIELD = 'username'
  objects = UserManager()

class Post(models.Model):
  id = models.UUIDField(primary_key=True)
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  username = models.CharField(max_length=200)
  userPicture = models.BooleanField()
  image = models.BooleanField(default=False)
  body = models.CharField(max_length=200)
  time = models.DateTimeField()
  likes = ArrayField(base_field=models.UUIDField(), blank=True)
  replies = ArrayField(base_field=models.UUIDField(), blank=True)

class Reply(models.Model):
  id = models.UUIDField(primary_key=True)
  origin = models.ForeignKey(Post, on_delete=models.CASCADE)
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  username = models.CharField(max_length=200)
  userPicture = models.BooleanField()
  image = models.BooleanField(default=False)
  body = models.CharField(max_length=200)
  time = models.DateTimeField()
  likes = ArrayField(base_field=models.UUIDField(), blank=True)

class Notification(models.Model):
  id = models.UUIDField(primary_key=True)
  time = models.DateTimeField()
  creator_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='creator')
  creator_name = models.CharField(max_length=200)
  creator_picture = models.BooleanField()
  target_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='target')
  type = models.CharField(max_length=200)
  object = models.UUIDField()
  seen = models.BooleanField(default=False)
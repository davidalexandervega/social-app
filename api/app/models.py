from distutils.text_file import TextFile
import uuid
from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.

from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import UserManager

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
  body = models.CharField(max_length=200)
  time = models.DateTimeField()
  likes = ArrayField(base_field=models.UUIDField(), blank=True)
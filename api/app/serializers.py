from rest_framework import serializers
from app.models import User, Post
from django.contrib.auth.hashers import make_password, check_password

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'email', 'username', 'password', 'picture', 'banner', 'bio', 'following', 'followers']

  def create(self, validated_data):
      validated_data['password'] = make_password(validated_data.get('password'))
      return super(UserSerializer, self).create(validated_data)

class PostSerializer(serializers.ModelSerializer):
  class Meta:
    model = Post
    fields = ['id', 'user', 'image', 'body', 'time', 'likes', 'replies']

class ReplySerializer(serializers.ModelSerializer):
  class Meta:
    model = Post
    fields = ['id', 'origin', 'user', 'image', 'body', 'time', 'likes']
from rest_framework import serializers
from app.models import User, Post

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id', 'username', 'password', 'picture', 'banner', 'bio', 'following', 'followers')

class PostSerializer(serializers.ModelSerializer):
  class Meta:
    model = Post
    fields = ('id', 'user', 'body', 'time')


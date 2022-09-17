from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from app.models import User, Post, Reply, Notification
from django.contrib.auth.hashers import make_password, check_password

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = User.objects.get(username=user.username).email
        token['userPicture'] = User.objects.get(username=user.username).picture

        return token

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'created', 'email', 'username', 'password', 'picture', 'banner', 'bio', 'following', 'followers']

  def create(self, validated_data):
      validated_data['password'] = make_password(validated_data.get('password'))
      return super(UserSerializer, self).create(validated_data)

class PostSerializer(serializers.ModelSerializer):
  class Meta:
    model = Post
    fields = ['id', 'user', 'username', 'userPicture', 'image', 'body', 'time', 'likes', 'replies']

class ReplySerializer(serializers.ModelSerializer):
  class Meta:
    model = Reply
    fields = ['id', 'origin', 'user', 'username', 'userPicture', 'image', 'body', 'time', 'likes']

class NotificationSerializer(serializers.ModelSerializer):
  class Meta:
    model = Notification
    fields = ['id', 'time', 'creator_id', 'creator_name', 'creator_picture', 'target_id', 'type', 'object', 'seen']